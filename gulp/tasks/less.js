'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    stripComments = require('gulp-strip-comments'),
    config = require('../config');

function lessTask() {
  return gulp.src(config.client.all + '/css/**/*.less')
      .pipe($.less())
      .pipe($.concat('less-styles.css.tmp'))
      .pipe($.cssnano())
      .pipe(stripComments({safe: false}))
      .pipe(gulp.dest(config.out + '/css'));
}

gulp.task('less', lessTask);
module.exports = lessTask;
