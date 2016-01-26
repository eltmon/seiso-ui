'use strict';

var gulp = require('gulp'),
  browserSync = require('../lib/browserSync');

function watchReloadTask() {
  browserSync.reload();
}

gulp.task('watch:reload', ['build'], watchReloadTask);
module.exports = watchReloadTask;
