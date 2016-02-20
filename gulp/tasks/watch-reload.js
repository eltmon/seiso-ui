'use strict';

var gulp = require('gulp'),
  browserSync = require('../lib/browserSync');

function watchReloadTask(cb) {
  browserSync.reload();
}

gulp.task('watch:reload', watchReloadTask);
module.exports = watchReloadTask;
