'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');

gulp.task('clean', function() {
	del(['build']);
})

gulp.task('html:index', function() {
	return gulp.src('src/client/index.html')
			   .pipe(gulp.dest('./static'));
});

gulp.task('html', function() {
	var opts = {
		conditionals: true,
		spare: true,
		empty: true,
		quotes: true
	};

	return gulp.src('src/client/view/*.html')
			   .pipe($.minifyHtml(opts))
			   .pipe(gulp.dest('./static'));
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

gulp.task('build', ['html', 'css', 'less', 'js', 'images']);
