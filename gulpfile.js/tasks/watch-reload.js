'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

function watchReloadTask() {
  browserSync.reload();
}

gulp.task('watch:reload', ['build'], watchReloadTask);
module.exports = watchReloadTask;
