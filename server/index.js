'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    favicon = require('serve-favicon');

var config =  require('../config'),
    logConfig = require('./logging'),
    routes = require('./routes'),
    configAuth = require('./auth'),
    SamlStrategy = require('passport-saml').Strategy,
    authRoutes = require('./routes').auth;

app.set('port', config.port);
logger.format('access', logConfig.loggerFormat);
app.use(logger('access', {stream: logConfig.accessLogStream}));

app.use(cookieParser());

var sessionConfig = {
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    key: 'express.sid',
    secure: true
  }
};

app.use(session(sessionConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

configAuth(app);

// Routes

routes.internal(app);


app.use('*', function(req, res, next) {
  next();
});

app.use(express.static(config.client.publicDir));
app.use(favicon(config.client.publicDir + '/images/favicon.ico'));

function start() {
  app.listen(config.port, function() {
    console.log('Server listening on port ', app.get('port'));
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    if (env === 'dev') {
      console.log('------------------------------');
      console.log('Configuration: \n', JSON.stringify(config, null, 2));
      console.log('------------------------------');   
    }
  });
}

module.exports = {
  start: start
};
