'use strict';

var gulp = require('gulp'),
		stripComments = require('gulp-strip-comments'),
    config = require('../config');

/*
 *  Copy vendor minified libraries directly.
 *  Check the main app.js entry file for additional deps that might
 *  be bundled with the app code. [IDM]
 */
var libs = {
  jquery: '/dist/',
  bootstrap: '/dist/js/',
  angular: '/',
  async: '/dist/',
  angular_route: '/',
  angular_ui_router: '/release/',
  angular_sanitize: '/',
  angular_animate: '/',
  // angular_ui_bootstrap: '/',
  d3: '/'
};

function vendorTask() {
	var sources = [];

  // special case because the lib dir doesn't match the lib filename. [IDM]
  sources.push(config.nodeModules + '/angular-ui-bootstrap/ui-bootstrap-tpls.min.js');

	for (var k in libs) {
		var libName = k.replace(/_/g, '-');
		sources.push(config.nodeModules + '/' + libName + libs[k] + libName + '.min.js');
	}

  var destPath = config.out + '/js';
  gulp.src(sources)
  	// .pipe(stripComments())
    .pipe(gulp.dest(destPath));
}

gulp.task('vendor:js', vendorTask);

module.exports = vendorTask;
