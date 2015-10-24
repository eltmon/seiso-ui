'use strict';

var config = require('../config');
var compact = require('lodash/array/compact');

// Grouped by what can run in parallel.
// Really I think all of these can run in parallel. Collapse? [WLW]
// Exclude html:index since we have to do that after building all the CSS and JS.
var assetTasks = ['fontawesome', 'fonts', 'images'],
    codeTasks = ['html', 'less', 'css', 'webpack:build'],
    indexInject = ['html:index'];

module.exports = function(env) {
  return {
    assetTasks: compact(assetTasks),
    codeTasks: compact(codeTasks),
    indexInject: indexInject
  };
};
