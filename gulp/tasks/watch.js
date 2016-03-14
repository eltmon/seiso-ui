'use strict';

var gulp = require('gulp'),
    config = require('../config'),
    path = require('path');

function watchTask() {
  var watchPath = config.client.js;
  return gulp.watch([watchPath, config.client.html], ['build']);
}

gulp.task('watch', ['build'], watchTask);
module.exports = watchTask;
