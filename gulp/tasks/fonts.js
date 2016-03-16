'use strict';

var gulp = require('gulp'),
    config = require('../config');

function fontsTask() {
  var exts = '*.{eot,svg,ttf,woff,woff2}';
  
  gulp.src(config.nodeModules + '/font-awesome/fonts/' + exts)
      .pipe(gulp.dest(config.out + '/fonts'));
 
  gulp.src(config.nodeModules + '/bootstrap/fonts/' + exts)
      .pipe(gulp.dest(config.out + '/fonts'));

}

gulp.task('fonts', fontsTask);
module.exports = fontsTask;
