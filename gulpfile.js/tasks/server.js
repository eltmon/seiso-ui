'use strict';

var gulp = require('gulp');
var server = require('../lib/server.js');

gulp.task('server', function() {
  return server.start();
});
