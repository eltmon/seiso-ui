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

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  favicon = require('serve-favicon');

var config =  require('./config'),
  logConfig = require('./lib/logging'),
  controllers = require('./lib/controllers'),
  publicDir = __dirname + '/static',
  configAuth = require('./src/server/auth'),
  homeController = require('./src/server/controllers/home');

logger.format('access', logConfig.loggerFormat);
app.use(logger('access', {stream: logConfig.accessLogStream}));

app.use(bodyParser.json());

configAuth(app);

app.set('port', config.port);
app.use('/', express.static(publicDir));

app.use(favicon(publicDir + '/images/favicon.ico'));

app.get('/isactive', homeController.isactive);
app.get('/buildinfo', homeController.buildinfo);

app.use('/instances', controllers.instances);
app.use('/getApiConfig', controllers.apiEndpoint);

function start() {
  app.listen(config.port, function() {
    console.log('Server listening on port ', app.get('port'));
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    console.log('------------------------------');
    console.log('Using this config: \n', JSON.stringify(config, null, 2));
    console.log('------------------------------');
  });
}

module.exports = {
  start: start
};
