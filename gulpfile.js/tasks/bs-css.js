'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

function task() {
  var srcPath = config.paths.nodeModules + '/bootstrap/dist/css/bootstrap.min.css';
  var destPath = config.paths.out + '/css';
  return gulp.src(srcPath)
      .pipe(gulp.dest(destPath));
}

gulp.task('bs:css', task);
module.exports = task;
