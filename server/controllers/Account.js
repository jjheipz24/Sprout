const models = require('../models');
const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login');
};

const signupPage = (req, res) => {
  res.render('signup');
}

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}

const homePage = (req, res) => {
  res.render('app');
};

//Functionality for login
const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;

  // makes sure all fields are filled
  if (!username) {
    return res.status(400).json({
      error: 'Please fill in the required fields',
    });
  }

  // checks to make sure login and password are correct
  return Account.AccountModel.authenticate(username, (err, account) => {
    if (err || !account) {
      return res.status(401).json({
        error: 'Wrong username',
      });
    }
    // sets the current session account based on username and password added
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
  req.body.username = `${req.body.username}`;

  if (!req.body.username) {
    return res.status(400).json({
      error: 'Please fill in the required fields',
    });
  }

// encrypts the users information
  const accountData = {
    username: req.body.username,
  };

  // creates the new account model
  const newAccount = new Account.AccountModel(accountData);

  const savePromise = newAccount.save();

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
        error: 'username already in use',
      });
    }

    return res.status(400).json({
      error: 'An error occured',
    });
  });
}

const getUserName = (request, response) => {
  const req = request;
  const res = response;

  if (req.session.account) {
    return res.json({
      username: req.session.account.username
    });
  }

  return res.json({
    username: ''
  });

};

const newPlant = async (request, response) => {
  const req = request;
  const res = response;

  const plant = {
    plantType: req.body.plantType,
    location: req.body.location,
    prompt: req.body.prompt,
    growthStage: 0,
    messages: [],
    allowedUsers: [],
  }

  const user = await Account.AccountModel.findOne({ username: req.session.account.username });
  user.plants.push(plant);

  const savePromise =  user.save();
  savePromise.then(() => {
    return res.status(201).json({
      redirect: '/',
    });
  });
  savePromise.catch((err) => {
    return res.status(400).json({
      error: 'An error occured',
    });
  });
}

const addMessage = async (request, response) => {
  const req = request;
  const res = response;
  const plant =  user.plants.find(plant => plant.location === req.body.location);

  const user = await Account.AccountModel.findOne({ username: req.session.account.username });
  plant.messages.push(req.body.messages);

  if(messages.length >= 3 && plant.growthStage === 0) {
    messages.forEach(message => {
      if(message.username !== req.session.account.username) {
        plant.growthStage += 1;
        return;
      }
    });
  } 

  const savePromise =  user.save();
  savePromise.then(() => {
    return res.status(201).json( /*{
      redirect: '/',
    }*/);
  });
  savePromise.catch((err) => {
    return res.status(400).json({
      error: 'An error occured',
    });
  });
}

const getPlants = async (request, response) => {
  const req = request;
  const res = response;

  if (req.session.account) {
    const user = await Account.AccountModel.findOne({ username: req.session.account.username });
    return res.json({
      plants: user.plants
    });
  }

  return res.json({
    plants: 'User not found'
  });
}

const clearAll = async (request, response) => {
  const req = request;
  const res = response;

  const user = await Account.AccountModel.findOne({ username: req.session.account.username });

  const savePromise =  user.update({ $pull : { plants : {$exists: true}}});
  savePromise.then(() => {
    return res.status(201).json();
  });
  savePromise.catch((err) => {
    return res.status(400).json({
      error: 'An error occured',
    });
  });
};

const loadRandomGardens = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findRandomGardens(req.session.account.username, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured in retrieving random gardens' });
    }

    return res.json({ randomGardens: docs});
  });
}

const loadAllGardens = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findAllGardens(req.session.account.username, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured in retrieving all gardens' });
    }

    return res.json({ allGardens: docs});
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
module.exports.logout = logout;
module.exports.homePage = homePage;

module.exports.getUserName = getUserName;
module.exports.getPlants = getPlants;
module.exports.getToken = getToken;

module.exports.loadRandomGardens = loadRandomGardens;
module.exports.loadAllGardens = loadAllGardens;
module.exports.newPlant = newPlant;
module.exports.addMessage = addMessage;
module.exports.clearAll = clearAll;