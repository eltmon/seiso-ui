'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('../config');
var wpConfig = require('../webpack.config.js');

function task() {
  return gulp.src(config.client + '/app.js')
      .pipe($.stripComments())
      .pipe($.webpack(wpConfig))
      .pipe($.ngAnnotate())
      // .pipe($.uglify())
      .pipe(gulp.dest(config.out + '/js'));
}

gulp.task('webpack', task);
module.exports = task;
