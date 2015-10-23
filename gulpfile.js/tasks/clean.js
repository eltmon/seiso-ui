'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

function task() {
  return gulp.src(config.out + '/*', { read: false })
      .pipe($.rimraf({ force: true }));
}

gulp.task('clean', task);
module.exports = task;
