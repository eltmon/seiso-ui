'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');
var browserSync = require('browser-sync');
var series = require('stream-series');

gulp.task('cp:index', function() {
  return gulp.src(config.client + '/index.html')
    .pipe(gulp.dest(config.out));
});

function htmlIndexTask() {

  var sources = gulp.src([
      config.out + '/css/**/*.css',
      config.out + '/js/**/*.js'
    ], { read: false });

  function sourceStream(path) {
    return gulp.src([config.out + path], {read: false});
  }

  var css = sourceStream('/css/**/*.css');
  var jquery = sourceStream('/js/jquery.min.js');
  var bootstrap = sourceStream('/js/bootstrap.bundle.js');
  var materials = sourceStream('/js/materials.bundle.js');
  var build = sourceStream('/js/build.bundle.js');

  var target = gulp.src(config.out + '/index.html');

  return target.pipe($.inject(series(css, jquery, bootstrap, build), {ignorePath: 'static/'}))
    .pipe(gulp.dest(config.out));
}

gulp.task('html:index', ['cp:index'], htmlIndexTask);

module.exports = htmlIndexTask;
