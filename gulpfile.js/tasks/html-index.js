'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');

function task() {
  var sources = gulp.src([
    config.paths.out + '/css/**/*.css'
  ], { read: false });
  var opts = {
    conditionals: true,
    spare: true,
    empty: true,
    quotes: true
  };
  return gulp.src(config.paths.client + '/index.html')
      .pipe($.inject(sources, { ignorePath: '/static' }))
      .pipe($.minifyHtml(opts))
      .pipe(gulp.dest(config.paths.out));
}

gulp.task('html:index', task);
module.exports = task;
