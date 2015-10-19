'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

gulp.task('fonts', function() {
  var exts = '*.{eot,svg,ttf,woff,woff2}';
  
  gulp.src(config.paths.client + '/css/fonts/' + exts)
      .pipe(gulp.dest(config.paths.out + '/fonts'));

  gulp.src(config.paths.nodeModules + '/font-awesome/fonts/' + exts)
      .pipe(gulp.dest(config.paths.out + '/fonts')); 

  gulp.src(config.paths.nodeModules + '/bootstrap/fonts/' + exts)
      .pipe(gulp.dest(config.paths.out + '/css/fonts'));
});
