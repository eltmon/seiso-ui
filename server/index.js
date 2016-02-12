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

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    favicon = require('serve-favicon');

var config =  require('../config'),
    logConfig = require('./logging'),
    routes = require('./routes'),
    configAuth = require('./auth');

app.set('port', config.port);
logger.format('access', logConfig.loggerFormat);
app.use(logger('access', {stream: logConfig.accessLogStream}));
app.use(bodyParser.json());

// Routes


var authRouter = express.Router();
configAuth(app, authRouter);
app.use('/', authRouter);

var internalRouter = express.Router();
routes.internal(internalRouter);
app.use('/', internalRouter);

app.use('*', function(req, res, next) {
  console.log(req.session);
  console.log(req.sessionID);
  next();
});

app.use('/', express.static(config.client.publicDir));
app.use(favicon(config.client.publicDir + '/images/favicon.ico'));

function start() {
  app.listen(config.port, function() {
    console.log('Server listening on port ', app.get('port'));
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    if (env === 'dev') {
      console.log('------------------------------');
      console.log('Configuration: \n', JSON.stringify(config, null, 2));
      console.log('------------------------------');   
    }
  });
}

module.exports = {
  start: start
};
