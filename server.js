/**
 * seiso-ui Web Server
 *
 * Serves static content of static ui with configuration
 * for service endpoints (seiso-api, etc).
 *
 * Author: Ian McCunn <imccunn@expedia.com>
 * 
 */

'use strict';

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	config =  require('./config'),
	logConfig = require('./lib/logging'),
	apiEndpointCtrl = require('./lib/controllers').apiEndpoint,
	publicDir = __dirname + '/static';


logger.format('access', logConfig.loggerFormat);
app.use(logger('access', {stream: logConfig.accessLogStream}));

app.set('port', config.port);
app.use('/', express.static(publicDir));

app.use('/getApiConfig', apiEndpointCtrl);

function start() {
  app.listen(config.port, function() {
    console.log('Server listening on port ', app.get('port'));
    console.log('Config: \n', config);
  });
}

module.exports = {
  start: start
};
