'use strict';

var gulp = require('gulp');
var config = require('../config');

// Using this in case there are multiple CSS libs that need to be copied. [IDM]
var vLibs = {
  bs: config.nodeModules + '/bootstrap/dist/css/bootstrap.min.css',
  material: config.nodeModules + '/angular-material/angular-material.min.css'
};

function cssTask() {
  var srcPath = vLibs.material;
  var destPath = config.out + '/css';
  gulp.src(srcPath)
    .pipe(gulp.dest(destPath));
}

gulp.task('css', cssTask);

module.exports = cssTask;