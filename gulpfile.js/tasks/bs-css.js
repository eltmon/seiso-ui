'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

gulp.task('bs:css', function() {
  var srcPath = config.paths.nodeModules + '/bootstrap/dist/css/bootstrap.min.css';
  var destPath = config.paths.out + '/css';
  return gulp.src(srcPath)
      .pipe(gulp.dest(destPath));
});
