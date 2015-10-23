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

  gulp.task('watch:reload', ['build'], browserSync.reload);
  gulp.watch(watchPath, ['watch:reload']);
  // gulp.watch(config.client + '/index.html').on('change', browserSync.stream);
}

gulp.task('serve', ['build'], watchTask);
module.exports = watchTask;
