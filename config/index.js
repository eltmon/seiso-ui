'use strict';

var _ = require('lodash');

var all = require('./env/_all.js'),
    envconfig = require('./env/' + (process.env.node_env || 'test') + '.js') || {},
    deployconfig = {},
    clientconfig = require('./config.js');

try {
  deployConfig = require('./config');
} catch (e) {
  console.log('Error reading config file: ', e);
}

module.exports = _.extend(all, envConfig, deployConfig, client Config);

