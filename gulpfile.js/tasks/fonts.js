'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

function task() {
  var exts = '*.{eot,svg,ttf,woff,woff2}';
  
  gulp.src(config.client + '/css/fonts/' + exts)
      .pipe(gulp.dest(config.out + '/fonts'));

  gulp.src(config.nodeModules + '/font-awesome/fonts/' + exts)
      .pipe(gulp.dest(config.out + '/fonts')); 

  gulp.src(config.nodeModules + '/bootstrap/fonts/' + exts)
      .pipe(gulp.dest(config.out + '/css/fonts'));
}

gulp.task('fonts', task);
module.exports = task;
