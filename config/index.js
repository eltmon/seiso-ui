'use strict';

var _ = require('lodash');

var all = require('./env/all.js');
var envConfig = require('./env/' + (process.env.NODE_ENV || 'dev') + '.js') || {};
var chefBuildConfig = {};

try {
	chefBuildConfig = require('./config');
} catch (e) {
	console.log('Error reading config file: ', e);
}

module.exports = _.extend(all, envConfig, chefBuildConfig);
