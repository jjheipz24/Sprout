const models = require('../models');
const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login');
};

const signupPage = (req, res) => {
  res.render('signup');
}

//Functionality for login
const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  // makes sure all fields are filled
  if (!username || !password) {
    return res.status(400).json({
      error: 'Please fill in the required fields',
    });
  }

  // checks to make sure login and password are correct
  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({
        error: 'Wrong username or password',
      });
    }
    // sets the current session account based on username and password added
    req.session.account = Account.AccountModel.toAPI(account);

    // redirects
    // return res.status(200).json({
    //   redirect: '/userPage',
    // });
    console.log("Login successful");
  });
}

//Account creation
const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({
      error: 'Please fill in the required fields',
    });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({
      error: 'Passwords do not match',
    });
  }

  // encrypts the users information
  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    // creates the new account model
    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.status(201).json({
        redirect: '/login',
      });
    });
    savePromise.catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({
          error: 'Username already in use',
        });
      }

      return res.status(400).json({
        error: 'An error occured',
      });
    });
  });
}

//gets csrf token for encryption
const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);

};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.signupPage = signupPage;
module.exports.signup = signup;
module.exports.getToken = getToken;