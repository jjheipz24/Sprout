const models = require('../models');
const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login');
};

const signupPage = (req, res) => {
  res.render('signup');
}

const homePage = (req, res) => {
  res.render('app');
}

//Functionality for login
const login = (request, response) => {
  const req = request;
  const res = response;

  const email = `${req.body.email}`;
  const password = `${req.body.pass}`;

  // makes sure all fields are filled
  if (!email || !password) {
    return res.status(400).json({
      error: 'Please fill in the required fields',
    });
  }

  // checks to make sure login and password are correct
  return Account.AccountModel.authenticate(email, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({
        error: 'Wrong email or password',
      });
    }
    // sets the current session account based on email and password added
    req.session.account = Account.AccountModel.toAPI(account);

    // redirects
    return res.status(200).json({
      redirect: '/',
    });

  });
}

//Account creation
const signup = (request, response) => {
  const req = request;
  const res = response;
  req.body.email = `${req.body.email}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.email || !req.body.pass || !req.body.pass2) {
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
      email: req.body.email,
      salt,
      password: hash,
    };

    // creates the new account model
    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();
    console.log(accountData.email);
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.status(201).json({
        redirect: '/',
      });
    });
    savePromise.catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({
          error: 'email already in use',
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
module.exports.homePage = homePage;
module.exports.getToken = getToken;