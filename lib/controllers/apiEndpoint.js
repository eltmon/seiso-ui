'use strict';

var config = require('../../config');

module.exports = function(req, res) {
  var responseBody = {};
  if (!config.apiEndpoint) {
    responseBody = {
      error: 'endpoint not set.'
    };
  } else {
    responseBody = {
      apiEndpoint: config.apiEndpoint
    };
  }
  res.status(200).json(responseBody);
};