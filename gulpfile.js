'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');


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
	return gulp.src(['src/client/view/**/*.html'])
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

gulp.task('js', ['clean'], function() {
	return gulp.src('src/client/js/**/*.js')
			   // .pipe($.uglify())
			   .pipe($.concat('all.js'))
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

gulp.task('build', ['clean', 'html', 'html:index', 'css', 'less', 'js', 'images', 'fonts']);
