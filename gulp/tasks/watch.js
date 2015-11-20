'use strict';

var gulp = require('gulp');
var config = require('../config');
var path = require('path');

function watchTask() {
  var watchPath = path.resolve(config.client, '/**');
  return gulp.watch([watchPath], ['watch:reload']);
}

gulp.task('watch', watchTask);
module.exports = watchTask;
