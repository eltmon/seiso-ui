'use strict';

var gulp = require('gulp'),
    del = require('del'),
    config = require('../config');

function cleanTask() {
  del([config.out]).then(function(things) {
    console.log('Deleted files and folders: \n', things.join('\n'));
  });
}

gulp.task('clean', cleanTask);
module.exports = cleanTask;
