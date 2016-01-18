'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var htmlmin = require('gulp-htmlmin');
var config = require('../config');

function htmlPartials() {
  return gulp.src(config.components + '/**/*.html')
      .pipe($.htmlmin({
      	collapseWhiteSpace: true,
      	preserveLineBreaks: true,
      	removeComments: true
      }))
      .pipe(gulp.dest(config.out + '/view'));
}

gulp.task('html', htmlPartials);
module.exports = htmlPartials;
