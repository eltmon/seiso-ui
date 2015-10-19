'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

gulp.task('bs:js', function() {
  var srcPath = config.paths.nodeModules + '/bootstrap/dist/js/bootstrap.min.js';
  var destPath = config.paths.out + '/js';
  return gulp.src(srcPath)
      .pipe(gulp.dest(destPath));
});
