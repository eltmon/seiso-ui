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
  spec: './spec/**',
  // Also acts as html-inject order
  vendorLibs: [
  	'jquery',
  	'bootstrap',
  	'angular',
  	'async',
  	'angular-ui-router',
    'angular-route',
  	'angular-sanitize',
    'angular-animate',
    'angular-cookies',
    'ui-bootstrap-tpls',
  	'd3'
  ]
};
