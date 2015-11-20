'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks');

function task(cb) {
  var tasks = getEnabledTasks();
  return runSequence('clean', tasks.assetTasks, tasks.codeTasks, 'html:index', /*'watch',*/ cb);
}

gulp.task('build', task);
module.exports = task;
