'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');
var browserSync = require('browser-sync'); 

gulp.task('cp:index', function() {
  return gulp.src(config.client + '/index.html')
    .pipe(gulp.dest(config.out));
});

function htmlIndexTask() {

  var sources = gulp.src([
      config.out + '/css/**/*.css',
      config.out + '/js/**/*.js'
    ], { read: false });

  var target = gulp.src(config.out + '/index.html');

  var htmlMinifyOpts = {
    conditionals: true,
    spare: true,
    empty: true,
    quotes: true
  };

  return target.pipe($.inject(sources, {ignorePath: 'static/'}))
    // .pipe($.minifyHtml(htmlMinifyOpts))
    .pipe(gulp.dest(config.out))
    .pipe(browserSync.reload({stream: true}));
}

gulp.task('html:index', ['cp:index'], htmlIndexTask);

module.exports = htmlIndexTask;
