'use strict';

  var client = './src/client';
  var server = './src/server';

// Gulp config
module.exports = {
  nodeModules: './node_modules',
  server: './src/server',
  client: './src/client',
  components: './src/client/components',
  out: './static',
  index: client + '/index.html',
  spec: './spec/**'
};
