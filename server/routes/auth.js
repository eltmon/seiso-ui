'use strict';

var authControllers = require('../controllers').auth,
	  config = require('../../config');

module.exports.init = function(router, passport, authenticationStrategy, config) {

  var redirectConfig = {
    successRedirect: '/',
    failureRedirect: '/login-failed'
  };

  router.get('/', function(req, res, next) {
   if (req.user !== undefined) console.log('there is a user.');
   else console.log('there is not a user.');
   next();
  })


  router.get('/login', login, passport.authenticate(config.auth.strategy, redirectConfig));
  function login(req, res, next) {
    console.log('login route hit');
    next();
  }

  router.post('/saml/consume', saml, passport.authenticate(config.auth.strategy, redirectConfig));
  function saml(req, res, next) {
    console.log('saml consume: ', req)
    next();
  }
  router.get('/login-failed', authControllers.loginFailed);
  router.get('/logout', authControllers.logout);
  router.get('/sp/metadata.xml', authControllers.generateServiceProviderMetadataEndpoint(authenticationStrategy));

};
