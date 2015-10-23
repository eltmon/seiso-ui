'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

function task() {
  var srcPath = config.nodeModules + '/bootstrap/dist/js/bootstrap.min.js';
  var destPath = config.out + '/js';
  return gulp.src(srcPath)
      .pipe(gulp.dest(destPath));
}

gulp.task('bs:js', task);
module.exports = task;
