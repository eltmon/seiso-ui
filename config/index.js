'use strict';

var _ = require('lodash');

var all = require('./env/all.js'),
    envConfig = require('./env/' + (process.env.NODE_ENV || 'test') + '.js') || {},
    deployConfig = {},
    clientConfig = {clientConfig: require('./config.js')};

try {
  deployConfig = require('./config');
} catch (e) {
  console.log('Error reading config file: ', e);
}

module.exports = _.extend(all, envConfig, deployConfig, clientConfig);

