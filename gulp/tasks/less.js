'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config');

function lessTask() {
  return gulp.src(config.client + '/css/**/*.less')
      .pipe($.less())
      .pipe($.minifyCss())
      .pipe(gulp.dest(config.out + '/css'));
}

gulp.task('less', lessTask);
module.exports = lessTask;
