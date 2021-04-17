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
  res.redirect('/start');
}

const homePage = (req, res) => {
  res.render('app');
};

const startPage = (req, res) => {
  res.render('start');
}

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
  let promptBody;

  switch(req.body.plantName) {
    case "Aloe Vera":
      promptBody = "everything will be okay";
      break;
    case "Cactus":
      promptBody = "you're proud of them";
      break;
    case "Fiddle Leaf":
      promptBody = "that they're strong";
      break;
    case "Jade":
      promptBody = "how well they've done so far";
      break;
    case "Peace Lily":
      promptBody = "they can achieve their goals";
      break;
    case "Snake Plant":
      promptBody = "to take a break and take care of themself";
      break;
    default:
      promptBody = "they can achieve their goals";
  }

  const plant = {
    plantType: req.body.plantType,
    plantName: req.body.plantName,
    location: req.body.location,
    prompt: promptBody,
    growthStage: req.body.growthStage,
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

  const user = await Account.AccountModel.findOne({ username: req.body.username });
  const plant =  user.plants.find(plant => plant.location === req.body.location);
  plant.messages.push(req.body.message);

  /* Check for num of messages & if one isn't from the owner before growing */
  console.log(plant.messages.length);
  if(plant.messages.length >= 1 && plant.growthStage === 0) {
    plant.messages.forEach(message => {
      if(message.username !== req.body.username) {
        plant.growthStage = 1;
      }
    });
  } 

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

const getPlantInfo = async (request, response) => {
  const req = request;
  const res = response;

  const user = await Account.AccountModel.findOne({ username: req.body.username});
  const plant =  user.plants.find(plant => plant.location === req.body.location);

  if (req.session.account) {
    return res.json({
      username: req.session.account.username,
      plant: plant
    });
  }

  return res.json({
    username: '',
    plant: ''
  });
}

const clearAll = async (request, response) => {
  const req = request;
  const res = response;

  const user = await Account.AccountModel.findOne({ username: req.session.account.username });

  const savePromise =  user.update({ $pull : { plants : {$exists: true}}});

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
};

const loadRandomGardens = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findRandomGardens(req.session.account.username, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured in retrieving random gardens' });
    }

    return res.status(200).json({ randomGardens: docs});
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

    return res.status(200).json({ allGardens: docs});
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
module.exports.startPage = startPage;

module.exports.getUserName = getUserName;
module.exports.getPlants = getPlants;
module.exports.getToken = getToken;
module.exports.getPlantInfo = getPlantInfo;

module.exports.loadRandomGardens = loadRandomGardens;
module.exports.loadAllGardens = loadAllGardens;
module.exports.newPlant = newPlant;
module.exports.addMessage = addMessage;
module.exports.clearAll = clearAll;