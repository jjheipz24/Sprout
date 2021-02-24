// import the controller folder (automatically calls the index.js file)
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);
};

module.exports = router;
