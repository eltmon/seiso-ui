'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

function task() {
  return gulp.src(config.paths.nodeModules + '/jquery/dist/jquery.min.js')
      .pipe(gulp.dest(config.paths.out + '/js'));
}

gulp.task('jquery', task);
module.exports = task;
