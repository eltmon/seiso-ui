
var controllers = require('../controllers');

module.exports = function(app) {
  

  app.get('/isactive', noCache, controllers.internal.isactive);
  app.get('/buildinfo', noCache, controllers.internal.buildinfo);

  app.get('/instances', noCache, controllers.instances);
  app.get('/getApiConfig', noCache, controllers.apiEndpoint);

  function noCache(req, res, next) {
  	res.setHeader('Cache-Control', 'no-cache');
  	next();
  }
};
