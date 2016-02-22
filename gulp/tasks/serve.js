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
  
  for (var i = 0; i < watchStreams.length; i++) {
    watchStreams[i].on('change', function(event) {
      console.log(clc.red(`File ${event.path} was ${event.type}.`));
    });
  }

  gulp.watch(config.out + '/**').on('change', function(){browserSync.reload()});
}

gulp.task('serve', ['build'], watchTask);
module.exports = watchTask;
