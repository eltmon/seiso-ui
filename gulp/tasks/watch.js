'use strict';

var gulp = require('gulp'),
    config = require('../config'),
    path = require('path');

function watchTask() {
  var watchPath = config.client.all + '/**';
  return gulp.watch([watchPath], ['build']);
}

gulp.task('watch', watchTask);
module.exports = watchTask;
