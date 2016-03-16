
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config'),
    series = require('stream-series');

gulp.task('cp:index', function() {
  return gulp.src(config.client.all + '/index.html')
    .pipe(gulp.dest(config.out));
});

function htmlIndexTask() {

  var sources = gulp.src([
      config.out + '/css/**/*.css',
      config.out + '/js/**/*.js'
    ], { read: false });

  function sourceStream(path) {
    return gulp.src([config.out + path]);
  }

  var sourceStreams = [];
  sourceStreams.push(sourceStream('/css/**/*.css'));
  for (var k in config.vendorLibs) {
    sourceStreams.push(
      sourceStream('/js/' + config.vendorLibs[k] + '.min.js')
    );
  }
  sourceStreams.push(sourceStream('/js/vendor.bundle.js'));
  sourceStreams.push(sourceStream('/js/build.bundle.js'));

  var target = gulp.src(config.out + '/index.html');

  return target.pipe($.inject(series.apply(this, sourceStreams), {ignorePath: 'static/'}))
    .pipe(gulp.dest(config.out));
}

gulp.task('html:index', ['cp:index', 'rmTemp'], htmlIndexTask);

module.exports = htmlIndexTask;
