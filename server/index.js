'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var https = require('https'),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    passport = require('passport'),
    favicon = require('serve-favicon'),
    compression = require('compression');

var config =  require('../config'),
    logConfig = require('./logging'),
    routes = require('./routes'),
    configAuth = require('./auth'),
    SamlStrategy = require('passport-saml').Strategy,
    authRoutes = require('./routes').auth;

app.set('port', config.port);

app.use(compression({filter: shouldCompress}));
function shouldCompress(req, res) {
  // Add compression filters here
  
  // default compression filter
  return compression.filter(req, res);
}

logger.format('access', logConfig.loggerFormat);
app.use(logger('access', {stream: logConfig.accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// var sessionConfig = {
//   secret: config.sessionSecret,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     key: 'express.sid',
//     secure: true
//   }
// };

var sessionConfig = {
  secret: config.sessionSecret,
  cookie: {
    secure: true
  }
};

app.use(session(sessionConfig));

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
    nameID: profile['NameID'],
    email: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
    firstName: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
    lastName: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
    department: profile['Department'],
    costCenter: profile['Cost Center'],
    phone: profile['Phone']
  };
  return done(null, profileObj);
}

var authenticationStrategy = new SamlStrategy(stratConfig, stratCb);
passport.use(config.auth.strategy, authenticationStrategy);
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

authRoutes.init(app, passport, authenticationStrategy, config);

configAuth(app);

// Routes

routes.internal(app);

var eosRouter = express.Router();
require('./routes').eos(eosRouter);
app.use('/eos', eosRouter);

app.use('*', function(req, res, next) {
  next();
});

// app.use(function(req, res, next) {
//   res.setHeader('Cache-Control', 'public, max-age=86400000');
//   next();
// });

var staticOptions = {
  dotfiles: 'ignore',
  etag: false,
  // extensions: ['html'],
  index: ['index.html'],
  maxAge: '1d',
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};
app.use(express.static(config.client.publicDir, staticOptions));
app.use(favicon(config.client.publicDir + '/images/favicon.ico'));

// Error Handling
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

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

function startHttps() {
  var privateKey = fs.readFileSync('keys/key.pem'),
      cert = fs.readFileSync('keys/cert.pem'),
      creds = {
        key: privateKey,
        cert: cert,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
      };
      
  var httpsServer = https.createServer(creds, app);
  httpsServer.listen(443, function(err, data) {
    if (err) return console.log(err);
    console.log(data);
    console.log('https started on port: ', 443);
  });
}

module.exports = {
  app: app,
  start: start,
  https: startHttps
};
