'use strict';

var gulp = require('gulp'),
  config = require('../config'),
  path = require('path');

function watchTask() {
  var watchPath = config.client + '/**';
  return gulp.watch([watchPath], ['watch:reload']);
}

gulp.task('watch', watchTask);
module.exports = watchTask;
