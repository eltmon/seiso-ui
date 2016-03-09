'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config');

function lessTask() {
  return gulp.src(config.client.all + '/css/**/*.less')
      .pipe($.less())
      .pipe($.concat('styles2.css'))
      .pipe($.cssnano())
      .pipe(gulp.dest(config.out + '/css'));
}

gulp.task('less', lessTask);
module.exports = lessTask;
