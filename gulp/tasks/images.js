'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

function imagesTask() {
  var srcPath = config.client + '/images/**/*.png';
  var destPath = config.out + '/images';
  return gulp.src(srcPath)
      .pipe(gulp.dest(destPath));
}

gulp.task('images', imagesTask);
module.exports = imagesTask;