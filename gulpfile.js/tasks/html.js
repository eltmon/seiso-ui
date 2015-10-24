'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');
var browserSync = require('../lib/browserSync');

function htmlPartials() {
  var opts = {
    conditionals: true,
    spare: true,
    empty: true,
    quotes: true
  };
  return gulp.src(config.components + '/**/*.html')
      .pipe($.minifyHtml(opts))
      .pipe(gulp.dest(config.out + '/view'));
}

gulp.task('html', htmlPartials);
module.exports = htmlPartials;
