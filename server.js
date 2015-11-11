'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var config =  require('./config');
var logConfig = require('./lib/logging');
var apiEndpointCtrl = require('./lib/controllers').apiEndpoint;

var port = process.env.PORT || 3000;
var publicDir = __dirname + '/static';

logger.format('access', logConfig.loggerFormat);
app.use(logger('access', {stream: logConfig.accessLogStream}));

app.set('port', port);
app.use('/', express.static(publicDir));

app.use('/getApiConfig', apiEndpointCtrl);

function start() {
  app.listen(app.get('port'), function() {
    console.log('Server listening on port ', app.get('port'));
  });
}

module.exports = {
  start: start
};
