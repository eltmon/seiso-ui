'use strict';

var gulp = require('gulp'),
  config = require('../config');

function fontsTask() {
  var exts = '*.{eot,svg,ttf,woff,woff2}';
  
  gulp.src(config.client + '/css/fonts/' + exts)
      .pipe(gulp.dest(config.out + '/fonts'));

}

gulp.task('fonts', ['clean'], fontsTask);
module.exports = fontsTask;
