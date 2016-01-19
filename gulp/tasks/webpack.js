'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config'),
    wpConfig = require('../../webpack.config.js'),
    browserSync = require('../lib/browserSync'),
    webpack = require('webpack'),
    wpStream = require('webpack-stream'),
    webpackConfig = Object.create(wpConfig);

function webpackBuildTask(cb) {
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new $.util.PluginError('webpack', err);
    $.util.log('[webpack]', stats.toString({colors: true}));
    cb();
  });
}

gulp.task('webpack:build', webpackBuildTask);
module.exports = webpackBuildTask;
