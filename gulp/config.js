'use strict';

var client = './client';
var server = './server';

// Gulp config
module.exports = {
  self: __dirname,
  nodeModules: './node_modules',
  server: server,
  client: {
    all: client,
    js: client + '/**/*.js',
    css: client + '/**/*.css',
    less: client + '/**/*.less',
    images: client + '/images',
    html: client + '/**/*.html'
  },
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
  	'angular-sanitize',
    'angular-animate',
    'angular-cookies',
    'ui-bootstrap-tpls',
  	'd3'
  ]
};
