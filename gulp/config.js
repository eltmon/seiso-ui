'use strict';

var client = './src/client';
var server = './src/server';

// Gulp config
module.exports = {
  self: __dirname,
  nodeModules: './node_modules',
  server: server,
  client: client,
  components: client + '/components',
  out: './static',
  index: client + '/index.html',
  spec: './spec/**'
};
