'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare: true,
    empty: true,
    quotes: true
  };
  return gulp.src(config.paths.components + '/**/*.html')
      .pipe($.minifyHtml(opts))
      .pipe(gulp.dest(config.paths.out + '/view'));
});
