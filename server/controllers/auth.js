'use strict';

module.exports = {

  loginFailed: function(req, res) {
    res.redirect('/');
  },

  logout: function(req, res) {
    req.logout();
    res.sendStatus(200);
  },

  generateServiceProviderMetadataEndpoint: function(authenticationStrategy) {
    return function spMetadata(req, res) {
      res.setHeader('content-type', 'application/xml');
      res.send(authenticationStrategy.generateServiceProviderMetadata());
    };
  }
};
