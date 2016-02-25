
var controllers = require('../controllers');

module.exports = function(app) {

  app.get('/isactive', controllers.internal.isactive);
  app.get('/buildinfo', controllers.internal.buildinfo);

  app.get('/instances', controllers.instances);
  app.get('/getApiConfig', controllers.apiEndpoint);
};
