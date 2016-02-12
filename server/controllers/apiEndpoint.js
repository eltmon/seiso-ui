'use strict';

var config = require('../../config');

module.exports = function(req, res) {
  var responseBody = {};
  if (!config.apis) {
    responseBody = {
      error: 'endpoint not set.'
    };
  } else {
    responseBody = {
      apiEndpoint: config.apis.seiso
    };
  }
  res.status(200).json(responseBody);
};
