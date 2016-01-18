'use strict';

var gulp = require('gulp'),
	del = require('del'),
	config = require('../config');

function task() {
  del(config.out).then(function(paths) {
    console.log('Deleted files and folders: \n', paths.join('\n'));
  });
}

gulp.task('clean', task);
module.exports = task;
