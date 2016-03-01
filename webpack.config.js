'use strict';

var path = require('path'),
    webpack = require('webpack'),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
    
var env = process.env.NODE_ENV;
var config = {};
var plugins = [
  new ngAnnotatePlugin({
    add: true
  })
];
if (env === 'dev') {
  config = {
    UglifyJsPlugin: {}
  };
} else {
  config = {
    UglifyJsPlugin: {
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
      // sourceMap: false,
      // // Don't mangle for now, as angular doesn't play well with obsfucation of directive names. [IDM]
      // // See: https://stackoverflow.com/questions/17238759/angular-module-minification-bug
      mangle: true,
      output: {
        comments: false
      }
    }
  };

  plugins.push(new webpack.optimize.UglifyJsPlugin(config.UglifyJsPlugin))
}

console.log(config);

module.exports = {
  cache: true,
  entry: {
    build: './client/app.js'
  },
  output: {
    path: __dirname + '/static/js/',
    filename: '[name].bundle.js',
    chunkFileName: '[id].bundle.js',
    publicPath: '/static/'
  },
  loaders: [
    { test: /\.html$/, loader: 'raw-loader'}
  ],
  // Allows us to require a lib in our app but just references an available, global reference to the library.
  // This is for vendor files that have been included in a script tag and avoids adding external libs to the
  // app bundle. [IDM]
  externals: {
    'jquery': 'jQuery',
    '$': 'jQuery',
    'angular': 'angular',
    'async': 'async'
  },
  plugins: plugins
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js', Infinity)
  // devServer: {
  //   contentBase: './static',
  //   hot: true,
  //   host: '0.0.0.0',
  //   port: 3000,
  //   proxy: {
  //     '*': 'http://localhost:3001'
  //   },
  //   quiet: false,
  //   noInfo: false,
  //   lazy: false,
  //   filename: 'build.bundle.js',
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   },
  //   // publicPath: '/static',
  //   headers: {'application/json': 'yes'},
  //   stats: {colors: true}
  // }
};
