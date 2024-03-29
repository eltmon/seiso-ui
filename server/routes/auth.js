'use strict';

var authControllers = require('../controllers').auth,
	  config = require('../../config');

module.exports.init = function(app, passport, authenticationStrategy, config) {

  var redirectConfig = {
    successRedirect: '/',
    failureRedirect: '/login-failed'
  };


  app.get('/login', login, passport.authenticate(config.auth.strategy, redirectConfig));
  function login(req, res, next) {
    if (authControllers.isAuthConfigured()) {
      next();
    } else {
      res.redirect('/');
    }
  }

  app.get('/checkAuth', function(req, res) {
    var body = {};
    if (req.isAuthenticated() && req.user) {
      body.authenticated = true;
    } else {
      body.authenticated = false;
    }
    res.status(200).json(body);
  });

  app.post('/saml/consume', saml, passport.authenticate(config.auth.strategy, redirectConfig));
  function saml(req, res, next) {
    next();
  }
  app.get('/login-failed', authControllers.loginFailed);
  app.get('/logout', authControllers.logout);
  app.get('/sp/metadata.xml', authControllers.generateServiceProviderMetadataEndpoint(authenticationStrategy));

};
