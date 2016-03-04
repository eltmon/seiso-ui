'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config'),
    args = require('yargs').argv;

/**
 * Run jshint and jscs for all JS files (src, test, and build tasks).
 */
function vetTask() {
  var allJS = '/**/*.js';
  var filesToVet = [config.client + allJS, config.client + '/test' + allJS, config.server + allJS, config.spec + allJS, config.self + allJS, '!/**/*_build.js'];
  return gulp.src(filesToVet)
      .pipe($.if(args.verbose, $.print()))
      .pipe($.jscs({ fix: true }))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
      .pipe($.jshint.reporter('fail'));
}

gulp.task('vet', vetTask);

module.exports = vetTask;
