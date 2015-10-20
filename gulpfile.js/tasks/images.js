'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

function task() {
  var srcPath = config.paths.client + '/images/**/*.png';
  var destPath = config.paths.out + '/images'
  return gulp.src(srcPath)
      .pipe(gulp.dest(destPath));
}

gulp.task('images', task);
module.exports = task;
