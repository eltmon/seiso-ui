var gulp = require('gulp');
var uncss = require('gulp-uncss');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
 
function uncssTask() {
    return gulp.src('static/css/less-styles.css.tmp')
      .pipe(uncss({
          html: ['static/index.html', 'static/view/**/*.html']
      }))
      .pipe(rename('less-styles.css'))
      .pipe(cssnano())
      .pipe(gulp.dest('./static/css/'));
}

gulp.task('uncss', ['html', 'css'], uncssTask);
module.exports = uncssTask;
