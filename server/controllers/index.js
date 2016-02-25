
var apiEndpointCtrl = require('./apiEndpoint'),
    instancesCtrl = require('./clientGlobalConfig'),
    internal = require('./internal'),
    auth = require('./auth'),
    eos = require('./eos');

module.exports = {
  apiEndpoint: apiEndpointCtrl,
  instances: instancesCtrl,
  internal: internal,
  auth: auth,
  eos: eos
};
