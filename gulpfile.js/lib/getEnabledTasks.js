'use strict';

var config = require('../config');
//var compact = require('lodash/array/compact');

// Grouped by what can run in parallel.
// Really I think all of these can run in parallel. Collapse? [WLW]
var assetTasks = ['fontawesome', 'fonts', 'images'];
var codeTasks = ['bs:css', 'bs:js', 'html', 'html:index', 'jquery', 'less', 'webpack'];

module.exports = function(env) {
  return {
    assetTasks: assetTasks,
    codeTasks: codeTasks
  };
};
