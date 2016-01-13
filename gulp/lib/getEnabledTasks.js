'use strict';

var config = require('../config');
var _ = require('lodash');

// Grouped by what can run in parallel.
// Really I think all of these can run in parallel. Collapse? [WLW]
// Exclude html:index since we have to do that after building all the CSS and JS.
var assetTasks = ['fontawesome', 'fonts', 'images'],
    codeTasks = ['html', 'vendorNoBuild', 'less', 'css', 'webpack:build'],
    indexInject = ['html:index'];

module.exports = function(env) {
  return {
    assetTasks: _.compact(assetTasks),
    codeTasks: _.compact(codeTasks),
    indexInject: indexInject
  };
};
