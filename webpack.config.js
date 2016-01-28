'use strict';

var path = require('path'),
    webpack = require('webpack'),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  entry: {
    build: './src/client/app.js'
  },
  output: {
    path: __dirname + '/static/js/',
    filename: '[name].bundle.js',
    chunkFileName: '[id].bundle.js'
  },
  externals: {
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js', Infinity),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery'
    }),
    new ngAnnotatePlugin({
      add: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      // minimize: true,
      // compress: {
      //   sequences: true,
      //   dead_code: true,
      //   conditionals: true,
      //   booleans: true,
      //   unused: true,
      //   if_return: true,
      //   join_vars: true,
      //   drop_console: true
      // },
      // sourceMap: false,
      // // Don't mangle for now, as angular doesn't play well with obsfucation of directive names. [IDM]
      // // See: https://stackoverflow.com/questions/17238759/angular-module-minification-bug
      // mangle: false,
      output: {
        comments: false
      }
    })
  ]
};
