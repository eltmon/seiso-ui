'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config');

function icons() {
  return gulp.src('./node_modules/material-design-icons/communication/svg/production/ic_call_24px.svg')
      .pipe(gulp.dest(config.out + '/icons'));
}

gulp.task('icons', icons);
module.exports = icons;
