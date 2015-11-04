'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    // jquery: './node_modules/jquery/dist/jquery.min.js',
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    material: './node_modules/angular-material/angular-material.min.js',
    build: './src/client/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'static/js'),
    filename: '[name].bundle.js',
    chunkFileName: '[id].bundle.js'
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      // jQuery: "jquery",
      $: 'jquery'
    })
  ]
};
