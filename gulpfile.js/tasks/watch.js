'use strict';

var gulp = require('gulp');
var config = require('../config');

function watchTask() {
  var watchPath = config.client + '/**';
  gulp.watch([watchPath], ['watch:reload']);
}

gulp.task('watch', watchTask);
module.exports = watchTask;
