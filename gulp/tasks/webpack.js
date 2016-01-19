'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('../config'),
    wpConfig = require('../../webpack.config.js'),
    browserSync = require('../lib/browserSync'),
    webpack = require('webpack'),
    wpStream = require('webpack-stream'),
    webpackConfig = Object.create(wpConfig);

webpackConfig.plugins = webpackConfig.plugins.concat(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production")
    }
  }),
  // Search for equal or similar files and deduplicate them in the output. Comes with overhead but reduces filesize.
  new webpack.optimize.DedupePlugin()

  // This is currently taking longer than it should. Leaving it out for now. 
  // Might need to uglify the output instead. [IDM]
  // 
  // new webpack.optimize.UglifyJsPlugin({
  //  mangle: {
  //    except: ['$', 'jQuery', 'angular', 'exports', 'require', 'module']
  //  }
  // })
);

function webpackBuildTask() {
  return gulp.src(config.client + '/app.js')
      .pipe($.ngAnnotate())
      .pipe(wpStream(webpackConfig, null, function(err, stats) {
        if (err) throw new $.util.PluginError("webpack:build", err);
        $.util.log("[webpack:build]", stats.toString({
          colors: true
        }));
      }))
      // .pipe($.stripComments())
      // .pipe($.uglify())
      .pipe(gulp.dest(config.out + '/js'));
}

gulp.task('webpack:build', webpackBuildTask);
module.exports = webpackBuildTask;
