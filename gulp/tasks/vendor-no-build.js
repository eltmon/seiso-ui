'use strict';

var gulp = require('gulp');
var config = require('../config');

var vLibs = {
  bs: config.nodeModules + '/bootstrap/dist/js/bootstrap.min.js',
  jq: config.nodeModules + '/jquery/dist/jquery.min.js'
};

function vendorTask() {
  var srcPath = vLibs.jq;
  var destPath = config.out + '/js';
  gulp.src(srcPath)
    .pipe(gulp.dest(destPath));
}

gulp.task('vendorNoBuild', vendorTask);

module.exports = vendorTask;
