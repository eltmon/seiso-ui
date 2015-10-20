'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

function task() {
  browserSync.reload();
}

gulp.task('watch:reload', ['build'], task);
module.exports = task;
