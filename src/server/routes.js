'use strict';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var homeController = require('./controllers/home');

/**
 * Initializes and secures routes
 * @param {Object} app Express application
 */
exports.init = function initializeRoutes(app, passport, authenticationStrategy, config) {

  var redirectConfig = {
    successRedirect: '/',
    failureRedirect: '/login-failed'
  };

  app.get('/login', passport.authenticate(config.auth.strategy, redirectConfig));

  app.post('/saml/consume', passport.authenticate(config.auth.strategy, redirectConfig));
  app.get('/login-failed', homeController.loginFailed);
  app.get('/logout', homeController.logout);
  app.get('/sp/metadata.xml', homeController.generateServiceProviderMetadataEndpoint());
  
  // Bootstrap secured route middleware
  // API calls should simply fail due to security exception
  app.all('/api/*', function (req, res, next) {
    if (config.auth.secured && !req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  });

  // // Pages should redirect to login
  // app.all('*', function (req, res, next) {
  //   if (config.auth.secured && !req.isAuthenticated()) {
  //     res.redirect('/login');
  //   } else {
  //     next();
  //   }
  // });

  // Bootstrap secured routes
	app.get('/index(.(html|htm|js|php|aspx))?', function(req, res) {
		res.redirect('/');
	});
}
