
var requireDir = require('require-dir'),
	gulp = require('gulp');

requireDir('./tasks', { recurse: true });


gulp.task('default', ['build']);