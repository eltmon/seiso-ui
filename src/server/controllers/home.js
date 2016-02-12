'use strict';

var config = require('../../../config');

module.exports = {

  loginFailed: function (req, res) {
    res.redirect('/');
  },

  logout: function (req, res) {
    req.logout();
    res.sendStatus(200);
  },

  generateServiceProviderMetadataEndpoint: function(authenticationStrategy) {
    return function spMetadata(req, res) {
      res.setHeader('content-type', 'application/xml');
      res.send(authenticationStrategy.generateServiceProviderMetadata());
    }
  },

  isactive: function(req, res) {
    res.setHeader('cache-control', 'no-cache');
    res.status(200).send('ACTIVE')
  },

  buildinfo: function(req, res) {
    var version = {};
    try {
      version = require('../../../config/version') || { version: 'unknown' };
    } catch (ex) {
      // Ignore
    }
    res.setHeader('cache-control', 'no-cache; max-age=0');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(version);
  }

};
