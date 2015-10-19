'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
var dir = __dirname + '/../../static';

app.set('port', port);
app.use('/', express.static(dir));

function start() {
  app.listen(app.get('port'), function() {
    console.log('Server listening on port ', app.get('port'));
  });
}

module.exports = {
  start: start
};
