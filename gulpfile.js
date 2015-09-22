'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var wpConfig = require('./webpack.config.js');
var config = require('./gulp/config');

gulp.task('clean', function() {
	return gulp.src('./static/*', {read: false})
			   .pipe($.rimraf({force: true}));
});

gulp.task('html:index', ['clean'], function() {
	var opts = {
		conditionals: true,
		spare: true,
		empty: true,
		quotes: true
	};
	return gulp.src('src/client/index.html')
			   .pipe($.minifyHtml(opts))
			   .pipe(gulp.dest('./static'));
});

gulp.task('html', ['clean'], function() {
	var opts = {
		conditionals: true,
		spare: true,
		empty: true,
		quotes: true
	};
	return gulp.src([
           'src/client/components/**/*.html',
           'src/client/view/**/*.html'
         ])
			   .pipe($.minifyHtml(opts))
			   .pipe(gulp.dest('./static/view'));
});

gulp.task('css', ['clean'], function() {
	return gulp.src('src/client/css/**/*.css')
			   .pipe($.minifyCss())
			   .pipe(gulp.dest('./static/css'));
});

gulp.task('less', ['clean'], function() {
	return gulp.src('src/client/css/**/*.less')
			   .pipe($.less())
			   .pipe($.minifyCss())
			   .pipe(gulp.dest('./static/css'))
})

gulp.task('bs:css', ['clean'], function() {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
             .pipe(gulp.dest('static/css/samurai'));
});

gulp.task('bs:js', ['clean'], function() {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
             .pipe(gulp.dest('static/js'));
});

gulp.task('jquery', ['clean'], function() {
	return gulp.src('node_modules/jquery/dist/jquery.min.js')
			   .pipe(gulp.dest('static/js'));
});

gulp.task('webpack', ['clean'], function() {
	return gulp.src('src/client/js/app.js')
			   .pipe($.webpack(wpConfig))
			   .pipe(gulp.dest('./static/js'));
});

gulp.task('images', ['clean'], function() {
	return gulp.src('src/client/images/**/*.png')
			   .pipe(gulp.dest('./static/images'));
});

gulp.task('fonts', ['clean'], function() {
	return gulp.src('src/client/css/fonts/*.{eot,svg,ttf,woff,woff2}')
			   .pipe(gulp.dest('./static/css/fonts'));
});

gulp.task('build', ['clean', 'webpack', 'html', 'd3', 'jquery', 'bs:css', 'bs:js', 'html:index', 'css', 'less', 'images', 'fonts']);

gulp.task('watch', function() {
	gulp.watch([config.paths.client], ['build']);
});