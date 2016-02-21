'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config');

function htmlPartials() {
  return gulp.src(config.components + '/**/*.html')
      .pipe($.htmlmin({
        collapseWhiteSpace: true,
        preserveLineBreaks: false,
        removeComments: true
      }))
      .pipe(gulp.dest(config.out + '/view'));
}

gulp.task('html', htmlPartials);
module.exports = htmlPartials;
