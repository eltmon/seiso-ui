'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var getEnabledTasks = require('../lib/getEnabledTasks');

gulp.task('build', function(cb) {
  var tasks = getEnabledTasks('watch');
  $.sequence(/*'vet',*/ 'clean', tasks.assetTasks, tasks.codeTasks, /*'watch',*/ cb);
});
