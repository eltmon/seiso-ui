'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');
var args = require('yargs').argv;

function vetTask() {
  return gulp.src([config.components + '/**/*.js', config.spec])
      .pipe($.if(args.verbose, $.print()))
      .pipe($.jscs({ fix: true }))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
      .pipe($.jshint.reporter('fail'));
}

gulp.task('vet', vetTask);
module.exports = vetTask;
