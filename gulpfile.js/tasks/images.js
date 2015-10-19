'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

gulp.task('images', function() {
  var srcPath = config.paths.client + '/images/**/*.png';
  var destPath = config.paths.out + '/images'
  return gulp.src(srcPath)
      .pipe(gulp.dest(destPath));
});
