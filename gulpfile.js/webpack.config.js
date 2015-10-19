'use strict';

module.exports = {
  context: __dirname + '/../src/client/',
  entry: './app.js',
  output: {
    path: __dirname + '/../static/js',
    filename: 'build.js'
  }
};
