'use strict';

var config = require('../config');
var _ = require('lodash');

// The only task we have to wait for is html:index which depends on the output
// file locations for files to inject. [IDM]
var assetTasks = ['fontawesome', 'fonts', 'images'],
    codeTasks = ['html', 'less', 'css', 'webpack:build', 'vendor:js'],
    indexInject = ['html:index'];

var parallelTasks = assetTasks.concat(codeTasks);

module.exports = function(env) {
  return {
    parallelTasks: _.compact(parallelTasks),
    indexInject: indexInject
  };
};
