'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config');

// Using this in case there are multiple CSS libs that need to be copied. [IDM]
var vLibs = {
  bs: config.nodeModules + '/bootstrap/dist/css/bootstrap.min.css',
  material: config.nodeModules + '/angular-material/angular-material.min.css'
};

function cssTask() {
  var srcPaths = [vLibs.bs, './client/css/styles.css'];
  var destPath = config.out + '/css';
  gulp.src(srcPaths)
  	.pipe($.concat('styles.css'))
    .pipe($.cssnano())
    .pipe(gulp.dest(destPath));
}

gulp.task('css', cssTask);

module.exports = cssTask;
