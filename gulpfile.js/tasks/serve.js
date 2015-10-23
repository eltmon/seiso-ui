'use strict';

var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync').create();

function task() {
  var watchPath = config.client + '/**';

  browserSync.init({
    server: config.out
  });

  return gulp.watch(watchPath, ['watch:reload']);
}

gulp.task('serve', ['build'], task);
module.exports = task;
