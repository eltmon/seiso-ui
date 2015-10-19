'use strict';

var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['build'], function() {
  var watchPath = config.paths.client + '/**';

  browserSync.init({
    watch: watchPath,
    server: config.paths.out
  });

  gulp.watch([watchPath], ['watch:reload']);
});
