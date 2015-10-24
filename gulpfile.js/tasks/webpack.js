'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');
var wpConfig = require('../../webpack.config.js');
var browserSync = require('../lib/browserSync');
var webpack = require('webpack');

var webpackConfig = Object.create(wpConfig);
webpackConfig.plugins = webpackConfig.plugins.concat(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production")
    }
  }),
  // Search for equal or similar files and deduplicate them in the output. Comes with overhead but reduces filesize.
  new webpack.optimize.DedupePlugin()
  //new webpack.optimize.UglifyJsPlugin()
);

function webpackBuild() {
  return gulp.src(config.client + '/app.js')
      .pipe($.ngAnnotate())
      .pipe($.webpack(webpackConfig, null, function(err, stats) {
        if (err) throw new $.util.PluginError("webpack:build", err);
        $.util.log("[webpack:build]", stats.toString({
          colors: true
        }));
      }))
      // .pipe($.stripComments())
      // .pipe($.uglify())
      .pipe(gulp.dest(config.out + '/js'));
}

gulp.task('webpack:build', webpackBuild);
module.exports = webpackBuild;
