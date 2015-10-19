'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

gulp.task('clean', function() {
  return gulp.src(config.paths.out + '/*', { read: false })
      .pipe($.rimraf({ force: true }));
});

