// Karma configuration
// Generated on Thu Oct 22 2015 12:02:13 GMT-0700 (PDT)

const fs = require('fs');
var depOrder = require('./gulp/config.js').vendorLibs;

// Set up paths of files to be loaded into the browser. See 'files' prop below.
var paths = [];
var files = fs.readdirSync('./static/js');
for (var i = 0; i < depOrder.length; i++) {
}

paths = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/angular/angular.min.js',
  './node_modules/angular-ui-router/release/angular-ui-router.min.js',
  './node_modules/async/dist/async.min.js',
  './static/js/vendor.bundle.js',
  './static/js/build.bundle.js',
  './node_modules/angular-mocks/angular-mocks.js'
];

paths = paths.concat([
  './client/test/*.spec.js',
  './client/test/**/*.spec.js'
]);
console.log(paths);

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: paths,

    // list of files to exclude
    exclude: [
        './client/test/e2e/main.spec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client/test/**/*.spec.js': ['webpack'],
      'client/**/*.js': ['webpack', 'coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

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
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
