'use strict';

var gulp = require('gulp'),
    config = require('../config'),
    browserSync = require('../lib/browserSync'),
    path = require('path'),
    clc = require('cli-color'),
    htmlTask = require('./html')();

function watchTask() {
  var watchPath = config.client.all + '/**';

  browserSync.init({
    proxy: 'localhost:3001',
    port: 3000
  });

  var watchStreams = [];
  watchStreams.push(gulp.watch(config.client.html, ['html']));
  watchStreams.push(gulp.watch(config.client.js, ['webpack:build']));
  watchStreams.push(gulp.watch(config.client.css, ['css']));
  watchStreams.push(gulp.watch(config.client.less, ['less']));

  function changeCb(event) {
    console.log(clc.red(`File ${event.path} was ${event.type}.`));
  }

  for (var i = 0; i < watchStreams.length; i++) {
    watchStreams[i].on('change', changeCb);
  }

  gulp.watch(config.out + '/**').on('change', browserSync.reload);
}

gulp.task('serve', ['build'], watchTask);
module.exports = watchTask;
