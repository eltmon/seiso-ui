'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    getEnabledTasks = require('../lib/getEnabledTasks');

function buildTask(cb) {
  var tasks = getEnabledTasks();
  return runSequence(tasks.parallelTasks, 'html:index', /*'watch',*/ cb);
}

gulp.task('build', ['clean'], buildTask);
module.exports = buildTask;
