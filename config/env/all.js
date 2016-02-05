'use strict';

module.exports = {
  port: process.env.PORT || 3001,
  accessLog: {
    fileSize: '1m',
    keep: 10,
    compress: true
  }
};
