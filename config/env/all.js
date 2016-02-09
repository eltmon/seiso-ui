
module.exports = {
  port: process.env.PORT || 8080,
  accessLog: {
    fileSize: '1m',
    keep: 10,
    compress: true
  }
};
