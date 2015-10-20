'use strict';

var gulp = require('gulp');
var config = require('../config');

function task() {
  console.log('Watching');
  var watchPath = config.paths.client + '/**';
  gulp.watch([watchPath], ['watch:reload']);
}

gulp.task('watch', task);
module.exports = task;
