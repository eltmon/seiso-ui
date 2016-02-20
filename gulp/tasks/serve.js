'use strict';

var gulp = require('gulp'),
    config = require('../config'),
    browserSync = require('../lib/browserSync'),
    path = require('path');

function watchTask() {
  var watchPath = config.client.all + '/**';

  browserSync.init({
    proxy: 'localhost:3001',
    port: 3000
  });

  gulp.watch(watchPath, ['build'], ['watch:reload']);
}

gulp.task('serve', ['build'], watchTask);
module.exports = watchTask;
