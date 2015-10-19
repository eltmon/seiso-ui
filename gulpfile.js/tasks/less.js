'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

gulp.task('less', function() {
  return gulp.src(config.paths.client + '/css/**/*.less')
      .pipe($.less())
      .pipe($.minifyCss())
      .pipe(gulp.dest(config.paths.out + '/css'));
})
