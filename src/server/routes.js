'use strict';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var homeController = require('./controllers/home');
// var apiVersionController = require('./controllers/api/version');
// var apiSeisoController = require('./controllers/api/seiso');
// var apiPostController = require('./controllers/api/filedata');
// var apiMachineQueryController = require('./controllers/api/machineQuery');
// var apiSmartlabController = require('./controllers/api/getsmart');
// var apiServiceInstancesController = require('./controllers/api/serviceInstances');

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

	// app.get('/', homeController.index);

  // API
  // app.post('/api', jsonParser, apiPostController.postServiceInstance);
  // app.post('/api/machine-query', jsonParser, apiMachineQueryController.queryMachineList);
  // app.get('/api/machine-query', apiMachineQueryController.requestMachineResults);
  // app.get('/api/version', apiVersionController.getCurrent);
  // app.get('/api/version/current', apiVersionController.getCurrent);
  // app.post('/api/getsmart/load-balancer/machine/', apiSmartlabController.queryIdLoadBalancer);
  // app.post('/api/getsmart/load-balancer-names', apiSmartlabController.getLoadBalancerApiHandles);
  // app.post('/api/service-instances', apiServiceInstancesController.post);
  // app.get('/api/seiso/services', apiSeisoController.getServiceList);
  // app.get('/api/seiso/services/:key', apiSeisoController.getService);
  // app.get('/api/seiso/service-types', apiSeisoController.getTypeList);
  // app.get('/api/seiso/service-types/:key', apiSeisoController.getType);
  // app.get('/api/seiso/data-centers', apiSeisoController.getDatacenterList);
  // app.get('/api/seiso/data-centers/:key', apiSeisoController.getDatacenter);
  // app.get('/api/seiso/environments', apiSeisoController.getEnvironmentList);
  // app.get('/api/seiso/environments/:key', apiSeisoController.getEnvironment);
  // app.get('/api/seiso/load-balancers', apiSeisoController.getLoadbalancerList);
  // app.get('/api/seiso/load-balancers/:key', apiSeisoController.getLoadbalancer);
  // app.get('/api/seiso/service-instances', apiSeisoController.getServiceInstanceList);
  // app.get('/api/seiso/service-instances/:key', apiSeisoController.getServiceInstance);
  // app.get('/api/seiso/nodes', apiSeisoController.getNodeList);
  // app.get('/api/seiso/nodes/:key', apiSeisoController.getNodeInstance);
  // app.get('/api/seiso/machines', apiSeisoController.getMachineList);
  // app.get('/api/seiso/machines/:key', apiSeisoController.getMachineInstance);
}
