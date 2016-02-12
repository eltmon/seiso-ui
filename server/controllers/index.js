
var apiEndpointCtrl = require('./apiEndpoint'),
    instancesCtrl = require('./clientGlobalConfig'),
    internal = require('./internal'),
    auth = require('./auth');

module.exports = {
  apiEndpoint: apiEndpointCtrl,
  instances: instancesCtrl,
  internal: internal,
  auth: auth
};
