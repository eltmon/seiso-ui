'use strict';

var config = require('../../config').clientConfig;

module.exports = function(req, res) {
  var responseBody = {};
  if (!config.apis) {
    responseBody = {
      error: 'endpoint not set.'
    };
  } else {
    responseBody = {
      apiEndpoints: config.apis
    };
  }
  res.status(200).json(responseBody);
};
