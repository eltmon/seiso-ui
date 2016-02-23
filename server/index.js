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

var stratConfig = {
  path: '/saml/consume',
  protocol: config.auth.callbackProtocol + '://',
  host: config.hostingEnvironment.externalHostname,
  entryPoint: config.auth.identityProvider.spInitiatedUrl,
  issuer: config.auth.serviceProvider.identity,
  identifierFormat: config.auth.serviceProvider.desiredSubjectFormat,
  cert: config.auth.identityProvider.signingCert,
  acceptedClockSkewMs: config.auth.acceptableClockSkewInMs
};

function stratCb(profile, done) {
  var profileObj = {
    id: profile.NameID,
    email: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
    displayName: profile.cn,
    firstName: profile.givenName,
    lastName: profile.sn,
    department: profile.Department,
    costCenter: profile['Cost Center'],
    phone: profile['Phone']
  };
  return done(null, profileObj);
}

var authenticationStrategy = new SamlStrategy(stratConfig, stratCb);

app.use(passport.initialize());
app.use(passport.session());
passport.use(config.auth.strategy, authenticationStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var authRouter = express.Router();
authRoutes.init(authRouter, passport, authenticationStrategy, config);
app.use('/', authRouter);

// Routes

var internalRouter = express.Router();
routes.internal(internalRouter);
app.use('/', internalRouter);

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
