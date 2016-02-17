
var controllers = require('../controllers');

module.exports = function(router) {

  router.get('/isactive', controllers.internal.isactive);
  router.get('/buildinfo', controllers.internal.buildinfo);

  router.get('/instances', controllers.instances);
  router.get('/getApiConfig', controllers.apiEndpoint);
};
