// Karma configuration
// Generated on Thu Oct 22 2015 12:02:13 GMT-0700 (PDT)

const fs = require('fs');
var depOrder = require('./gulp/config.js').vendorLibs;

var paths = [];
var files = fs.readdirSync('./static/js');
for (var i = 0; i < depOrder.length; i++) {
  paths.push('./static/js/' + depOrder[i] + '.min.js');
}
paths.push('./static/js/build.bundle.js');
paths.push('./node_modules/angular-mocks/angular-mocks.js');

// paths = files.map((fileName) => {
//     return './static/js/' + fileName;
// });
paths = paths.concat([
  'test/*.spec.js',
  'test/**/*.spec.js'
]);

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: paths,

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.spec.js': ['webpack'],
      'test/**/*.spec.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
