'use strict';

var authControllers = require('../controllers').auth,
	  config = require('../../config');

module.exports.init = function(router, passport, authenticationStrategy, config) {

  var redirectConfig = {
    successRedirect: '/',
    failureRedirect: '/login-failed'
  };

  router.get('/', function(req, res, next) {
    console.log('sessionID: ', req.sessionID);
   next();
  });


  router.get('/login', login, passport.authenticate(config.auth.strategy, redirectConfig));
  function login(req, res, next) {
    console.log('login route hit, sessionID: ', req.sessionID);
    next();
  }

  router.get('/checkAuth', function(req, res) {
    var body = {};
    if (req.isAuthenticated()) {
      body.authenticated = true;
    } else {
      body.authenticated = false;
    }
    res.status(200).json(body);
  });

  router.post('/saml/consume', saml, passport.authenticate(config.auth.strategy, redirectConfig));
  function saml(req, res, next) {

    next();
  }
  router.get('/login-failed', authControllers.loginFailed);
  router.get('/logout', authControllers.logout);
  router.get('/sp/metadata.xml', authControllers.generateServiceProviderMetadataEndpoint(authenticationStrategy));

};
