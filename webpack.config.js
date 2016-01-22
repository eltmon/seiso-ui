'use strict';

var path = require('path'),
    webpack = require('webpack'),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  entry: {
    // jquery: './node_modules/jquery/dist/jquery.min.js',
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    material: './node_modules/angular-material/angular-material.min.js',
    build: './src/client/app.js',

  },
  output: {
    path: __dirname + '/static/js/',
    filename: '[name].bundle.js',
    chunkFileName: '[id].bundle.js'
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new ngAnnotatePlugin({
      add: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      sourceMap: false,
      mangle: false,
      output: {
        comments: false
      }
    })
  ]
};
