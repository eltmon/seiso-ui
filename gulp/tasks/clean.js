var gulp = require('gulp'),
  del = require('del'),
  config = require('../config');


function cleanTask(cb) {
  del([config.out]).then(function(paths) {
    cb();
  });
}

gulp.task('clean', cleanTask);
module.exports = cleanTask;
