'use strict';

var gulp = require('gulp')
var jasmine = require('gulp-jasmine');
var config = require('../config');
var reporters = require('jasmine-reporters');
var webpack = require('gulp-webpack');
var KarmaServer = require('karma').Server;
var path = require('path');

gulp.task('build:test', function() {
  
  gulp.src('./spec/spec.html')
    .pipe(gulp.dest('./spec/build/'));

  return gulp.src('./spec/*.js')
    .pipe(webpack({
      context: 'spec/',
      entry: './test.spec.js',
      output: {
        path: __dirname + '/../spec/build',
        filename: 'test_build.js'
      }
    }))
    .pipe(gulp.dest('./spec/build'));
});

function karmaStart(done) {
  new KarmaServer({
    configFile: path.resolve(__dirname, '../../karma.conf.js'),
    singeRun: true
  }, done).start();
}

gulp.task('spec', ['build:test'], karmaStart);

module.exports = karmaStart;
