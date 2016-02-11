'use strict';

var config = require('../../../config');

module.exports = {

  // Home page
  index: function(req, res) {
    res.sendStatus(200);
  },

  // Display generic login failure page
  loginFailed: function (req, res) {
    res.json({info: 'login failed.'});
  },

  // Display generic logout page
  logout: function (req, res) {
    req.logout();
    res.send(200);
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
