// import the controller folder (automatically calls the index.js file)
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

  app.get('/', controllers.Account.homePage);
  app.get('/home', controllers.Account.homePage);

  app.get('/start', controllers.Account.startPage);
  
  app.get('/login',  mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login',  mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/getUserName', mid.requiresSecure, mid.requiresLogin, controllers.Account.getUserName);
  app.get('/getPlants', mid.requiresSecure, mid.requiresLogin, controllers.Account.getPlants);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/', controllers.Account.homePage);

  app.get('/loadRandomGardens', controllers.Account.loadRandomGardens);
  app.get('/loadAllGardens', controllers.Account.loadAllGardens);
  app.post('/newPlant', mid.requiresSecure, mid.requiresLogin, controllers.Account.newPlant);
  app.post('/addMessage', controllers.Account.addMessage);

  app.delete('/clear', mid.requiresLogin, controllers.Account.clearAll);
  /*
    Figured this out with the help of https://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
  */
  // app.get('*', mid.requiresLogin, controllers.Account.errorPage);

};

module.exports = router;
