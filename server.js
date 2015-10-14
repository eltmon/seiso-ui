
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/', express.static(__dirname + '/static'));

function start() {
  app.listen(app.get('port'), function() {
    console.log('server listening on port ', app.get('port'));
  });
}

module.exports = {
  start: start
};
