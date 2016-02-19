'use strict';

var _ = require('lodash');

var all = require('./env/all.js');
var envConfig = require('./env/' + (process.env.NODE_ENV || 'test') + '.js') || {};
var deployConfig = {};

try {
  deployConfig = require('./config');
} catch (e) {
  console.log('Error reading config file: ', e);
}

module.exports = _.extend(all, envConfig, deployConfig);
