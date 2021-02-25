// import the controller folder (automatically calls the index.js file)
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);
  
  app.get('/', controllers.Account.loginPage);
  /*
    Figured this out with the help of https://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
  */
  // app.get('*', mid.requiresLogin, controllers.Account.errorPage);

};

module.exports = router;
