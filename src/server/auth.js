
var passport = require('passport'),
  session = require('express-session'),
  config = require('../../config')
  SamlStrategy = require('passport-saml').Strategy,
  routes = require('./routes');

module.exports = function(app) {

  var sessionConfig = {
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
  };
  // app.use(session(sessionConfig));

  app.use(passport.initialize());
  // app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

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
    console.log(profile);
    var profileObj = {
      id: profile.NameID,
      email: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      displayName: profile.cn,
      firstName: profile.givenName,
      lastName: profile.sn,
      department: profile.Department,
      costCenter: profile['Cost Center']
    };
    return done(null, profileObj);
  }

  var authenticationStrategy = new SamlStrategy(stratConfig, stratCb);

  passport.use(config.auth.strategy, authenticationStrategy);

  routes.init(app, passport, authenticationStrategy, config);

};