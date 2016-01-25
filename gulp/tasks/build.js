'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    getEnabledTasks = require('../lib/getEnabledTasks');

function buildTask(cb) {
  var tasks = getEnabledTasks();
  return runSequence(tasks.assetTasks, tasks.codeTasks, 'html:index', /*'watch',*/ cb);
}

gulp.task('build', buildTask);
module.exports = buildTask;
