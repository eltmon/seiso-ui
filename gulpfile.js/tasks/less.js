'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');
var browserSync = require('browser-sync');

function task() {
  return gulp.src(config.client + '/css/**/*.less')
      .pipe($.less())
      .pipe($.minifyCss())
      .pipe(gulp.dest(config.out + '/css'))
      .pipe(browserSync.stream());
}

gulp.task('less', task);
module.exports = task;
