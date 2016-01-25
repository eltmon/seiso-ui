'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config'),
    wpConfig = Object.create(require('../../webpack.config.js')),
    webpack = require('webpack');

function webpackBuildTask(cb) {
  webpack(wpConfig, function(err, stats) {
    if (err) throw new $.util.PluginError('webpack', err);
    $.util.log('[webpack]', stats.toString({colors: true}));
    cb();
  });
}

gulp.task('webpack:build', webpackBuildTask);
module.exports = webpackBuildTask;
