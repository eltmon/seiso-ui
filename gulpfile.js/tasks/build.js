'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var getEnabledTasks = require('../lib/getEnabledTasks');

function task(cb) {
  var tasks = getEnabledTasks();
  return $.sequence('clean', tasks.assetTasks, tasks.codeTasks, 'html:index', /*'watch',*/ cb);
}

gulp.task('build', task);
module.exports = task;
