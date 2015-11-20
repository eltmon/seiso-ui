'use strict';

var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');
var path = require('path');

function watchTask() {
  var watchPath = config.client + '/**';

  browserSync.init({
    server: config.out
  });

  gulp.watch(watchPath, ['watch:reload']);
}

gulp.task('serve', ['build'], watchTask);
module.exports = watchTask;
