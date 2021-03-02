// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const csrf = require('csurf');
const redis = require('redis');
const session = require('express-session');
const url = require('url');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// pull in our routes
const router = require('./router.js');

//mongo bongo
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/Sprout';

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

//redis
let redisURL = {
  hostname: 'redis-16032.c245.us-east-1-3.ec2.cloud.redislabs.com',
  port: 16032,
};

let redisPASS = 'sxQiggVY5xDl80DDHUX0KIjPE62XwQSJ';

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[1];
}


const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
// app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    client: redisClient,
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS,
  }),
  secret: 'plant time',
  resave: true,
  saveUninitialized: true,
}));
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.disable('x-powered-by');
app.use(cookieParser());
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  console.log('Missing CSRF token');
  return false;
});

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
