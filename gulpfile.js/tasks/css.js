var gulp = require('gulp');
var path = require('path');
var baseDir = process.cwd();
var nodeDir = path.resolve(baseDir, '/node_modules');
var config = require('../config');

console.log(baseDir);

var vLibs = {
  bs: {
    css: path.resolve(nodeDir, '/bootstrap/dist/css/bootstrap.min.css')
  }, 
};

function cssTask() {
  return gulp.src('../../node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(config.out + '/css'));
}

gulp.task('css:bs', cssTask);

module.exports = cssTask;
