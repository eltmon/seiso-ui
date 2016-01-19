'use strict';

var gulp = require('gulp'),
    config = require('../config');

function task() {
  var srcPath = config.nodeModules + '/font-awesome/css/font-awesome.min.css';
  var destPath = config.out + '/css';
  return gulp.src(srcPath)
      .pipe(gulp.dest(destPath));
}

gulp.task('fontawesome', task);
module.exports = task;
