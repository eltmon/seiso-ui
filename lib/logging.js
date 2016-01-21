'use strict';

var fs = require('fs');
var lgrStream = require('logrotate-stream');
var config = require('../config');

// Set access logs
try {
  console.log('Setting access logs...');
  fs.mkdirSync('C:/Users/Wayne/logs/');
} catch (ex) {
  if (ex.code !== 'EEXIST') {
    throw ex;
  }
}

var streamConfig = {
  file: 'C:/Users/Wayne/logs//access.log',
  size: config.accessLog.fileSize,
  keep: config.accessLog.keep,
  compress: config.accessLog.compress
};

module.exports = {
  accessLogStream: lgrStream(streamConfig),
  loggerFormat: '[:date] ip=:remote-addr mtd=:method ' +
                'url=:url http=:http-version rfr=":referrer" ' +
                'st=:status cl=:res[content-length] - time=:response-time ms'
};

