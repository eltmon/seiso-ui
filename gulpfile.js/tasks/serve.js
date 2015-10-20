'use strict';

var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync').create();

function task() {
  var watchPath = config.paths.client + '/**';

  browserSync.init({
    server: {
      baseDir: config.paths.out
    }
  });

  // FIXME ['watch:reload'] is causing an error when I save a content change:
  // "Task '[object Object]' is not in your gulpfile"
  // Looks like it's because watch:reload is calling build
  gulp.watch(watchPath, ['watch:reload']);
}

gulp.task('serve', ['build'], task);
module.exports = task;
