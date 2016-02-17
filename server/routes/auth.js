'use strict';

var authControllers = require('../controllers').auth,
	config = require('../../config');

module.exports.init = function(router, passport, authenticationStrategy, config) {

  var redirectConfig = {
    successRedirect: '/',
    failureRedirect: '/login-failed'
  };

  router.get('/login', passport.authenticate(config.auth.strategy, redirectConfig));

  router.post('/saml/consume', passport.authenticate(config.auth.strategy, redirectConfig));
  router.get('/login-failed', authControllers.loginFailed);
  router.get('/logout', authControllers.logout);
  router.get('/sp/metadata.xml', authControllers.generateServiceProviderMetadataEndpoint(authenticationStrategy));

};
