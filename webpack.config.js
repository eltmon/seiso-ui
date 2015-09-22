
module.exports = {
  context: __dirname + '/src/client/js',
  entry: './app.js',
  output: {
    path: __dirname + '/static/js',
    filename: 'build.js'
  }
};
