'use strict';

var gulp = require('gulp');
var path = require('path');
var config = require('../config');

// Using this in case there are multiple CSS libs that need to be copied. [IDM]
var vLibs = {
  bs: path.resolve(config.nodeModules, '/bootstrap/dist/css/bootstrap.min.css') 
};

function cssTask() {
  return gulp.src(vLibs.bs)
    .pipe(gulp.dest(config.out + '/css'));
}

gulp.task('css:bs', cssTask);

module.exports = cssTask;
