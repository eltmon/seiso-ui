
var config = require('../../config').clientConfig;

module.exports = function(req, res) {
  var responseBody = {};
  if (!config.instances) {
    responseBody = {
      error: 'Instances not configured.'
    };
  } else {
    responseBody = {
      instances: config.instances,
      current_instance: config.current_instance
    };
  }
  res.status(200).json(responseBody);
};
