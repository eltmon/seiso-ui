'use strict';

var gulp = require('gulp'),
    config = require('../config'),
    webpack = require('webpack-stream'),
    path = require('path'),
    KarmaServer = require('karma').Server,
    reporters = require('jasmine-reporters'),
    jasmine = require('gulp-jasmine');

gulp.task('build:test', function() {
  
  gulp.src('./test/spec.html')
    .pipe(gulp.dest('./test/build/'));

  gulp.src('./test/*.js')
    .pipe(webpack({
      context: 'test/',
      entry: './test.spec.js',
      output: {
        path: __dirname + '/test/build',
        filename: 'test_build.js'
      }
    }))
    .pipe(gulp.dest('./test/build'));
});

function karmaStart(done) {
  new KarmaServer({
    configFile: path.resolve(__dirname, '../../karma.conf.js'),
    singeRun: true
  }, done).start();
}

gulp.task('spec', ['build:test'], karmaStart);

module.exports = karmaStart;
