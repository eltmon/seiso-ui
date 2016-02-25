var gulp = require('gulp'),
  	config = require('../config'),
  	exec = require('child_process').exec;

const path = config.out;

function cleanTask(cb) {
	exec('rm -rfv ' + path, (err, stdout, stderr) => {
		cb();
	});
}

gulp.task('clean', cleanTask);
module.exports = cleanTask;
