'use strict';

var gulp = require('gulp');
var server = require('../../server.js');

function task() {
  return server.start();
}

gulp.task('server', task);
module.exports = task;
