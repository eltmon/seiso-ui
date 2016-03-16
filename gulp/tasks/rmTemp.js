'use strict';

var gulp = require('gulp');
var tmpFileLocations = ['static/css/less-styles.css.tmp'];
var exec = require('child_process').exec;
var async = require('async');

function rmTempFiles(cb) {
  async.each(tmpFileLocations, function(loc, _cb) {
    console.log('attempt to remove ' + loc);
    exec(`rm -rfv ${loc}`, (err, stdout, stderr) => {
      if (err) _cb(err);
      console.log(stdout);
      _cb();
    });
  }, function(err) {
    if (err) {
      console.log(err);
      cb(err);
    }
    cb();
  });
}

gulp.task('rmTemp', ['uncss'], rmTempFiles);
module.exports = rmTempFiles;
