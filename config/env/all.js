'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  accessLog: {
    fileSize: '1m',
    keep: 10,
    compress: true
  }
};
