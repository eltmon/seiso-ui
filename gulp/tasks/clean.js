var gulp = require('gulp'),
  	del = require('del'),
  	config = require('../config');

function cleanTask(cb) {
  return del(['./static']);
}

gulp.task('clean', cleanTask);
module.exports = cleanTask;
