/*
  gulpfile.js
  ===========

  To add a new task, add a task file to the tasks directory. default.js specifies
  the default set of tasks to run when you run `gulp`.
*/
'use strict';

var requireDir = require('require-dir');

requireDir('./tasks', { recurse: true });
