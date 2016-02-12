
var config = require('../../config');

module.exports = function(req, res) {
  var responseBody = {};
  if (!config.instances) {
    responseBody = {
      error: 'Instances not configured.'
    };
  } else {
    responseBody = {
      instances: config.instances
    };
  }
  res.status(200).json(responseBody);
};
