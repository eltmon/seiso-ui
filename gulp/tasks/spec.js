'use strict';

var gulp = require('gulp');
var config = require('../config');
var webpack = require('webpack-stream');
var path = require('path');

var KarmaServer = require('karma').Server;
var reporters = require('jasmine-reporters');
var jasmine = require('gulp-jasmine');

gulp.task('build:test', function() {
  
  gulp.src('./spec/spec.html')
    .pipe(gulp.dest('./spec/build/'));

  gulp.src('./spec/*.js')
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
