'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');
var args = require('yargs').argv;

function task() {
  return gulp.src(config.paths.components + '/**/*.js')
      .pipe($.if(args.verbose, $.print()))
      .pipe($.jscs({ fix: true }))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
      .pipe($.jshint.reporter('fail'));
}

gulp.task('vet', task);
module.exports = task;
