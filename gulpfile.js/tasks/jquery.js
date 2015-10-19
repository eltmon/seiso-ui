'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

gulp.task('jquery', function() {
  return gulp.src(config.paths.nodeModules + '/jquery/dist/jquery.min.js')
      .pipe(gulp.dest(config.paths.out + '/js'));
});
