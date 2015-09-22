'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');

gulp.task('clean', function() {
	del(['static']);
})

gulp.task('html:index', function() {
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

gulp.task('html', function() {
	var opts = {
		conditionals: true,
		spare: true,
		empty: true,
		quotes: true
	};

	return gulp.src(['src/client/view/**/*.html'])
			   .pipe($.minifyHtml(opts))
			   .pipe(gulp.dest('./static/view'));
});

gulp.task('css', function() {
	return gulp.src('src/client/css/**/*.css')
			   .pipe($.minifyCss())
			   .pipe(gulp.dest('./static/css'));
});

gulp.task('less', function() {
	return gulp.src('src/client/css/**/*.less')
			   .pipe($.less())
			   .pipe($.minifyCss())
			   .pipe(gulp.dest('./static/css'))
})

gulp.task('js', function() {
	return gulp.src('src/client/js/**/*.js')
			   .pipe($.uglify())
			   .pipe(gulp.dest('./static/js'));
});

gulp.task('images', function() {
	return gulp.src('src/client/images/**/*.png')
			   .pipe(gulp.dest('./static/images'));
});

gulp.task('fonts', function() {
	return gulp.src('src/client/css/fonts/*.{eot,svg,ttf,woff,woff2}')
			   .pipe(gulp.dest('./static/css/fonts'));
});

gulp.task('build', ['clean', 'html', 'html:index', 'css', 'less', 'js', 'images', 'fonts']);
