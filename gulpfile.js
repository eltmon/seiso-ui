'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;
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
	return gulp.src('src/client/components/**/*.html')
			   // .pipe($.minifyHtml(opts))
			   .pipe(gulp.dest(config.paths.out + 'view'));
});

gulp.task('css', ['clean'], function() {
	return gulp.src('src/client/css/**/*.css')
			   .pipe($.minifyCss())
			   .pipe(gulp.dest('./static/css'));
});

gulp.task('fontawesome', ['clean'], function() {
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
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
             .pipe(gulp.dest('static/css'));
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
	return gulp.src('src/client/app.js')
			   // .pipe($.ngAnnotate())
			   // .pipe($.stripComments())
			   .pipe($.webpack(wpConfig))
			   // .pipe($.uglify())
			   .pipe(gulp.dest('./static/js'));
});

gulp.task('vet', function() {
	return gulp.src(config.paths.components)
			 .pipe($.if(args.verbose, $.print()))
             .pipe($.jscs({
                fix: true
             }))
             .pipe($.jshint())
             .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
             .pipe($.jshint.reporter('fail'));
});

gulp.task('images', ['clean'], function() {
	return gulp.src('src/client/images/**/*.png')
			   .pipe(gulp.dest('./static/images'));
});

gulp.task('fonts', ['clean'], function() {
	return gulp.src('src/client/css/fonts/*.{eot,svg,ttf,woff,woff2}')
			   .pipe(gulp.dest('./static/css/fonts'));
});

gulp.task('build', ['clean', 'webpack', 'html', 'jquery', 'bs:css', 'bs:js', 'html:index', 'css', 'fontawesome', 'less', 'images', 'fonts']);

gulp.task('watch', function() {
	gulp.watch([config.paths.client], ['build']);
});
