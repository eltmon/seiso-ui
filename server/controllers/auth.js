'use strict';

var config = require('../../config');

module.exports = {

  loginFailed: function loginFailed(req, res) {
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
  },

  isAuthConfigured: function() {
    var auth = config.auth,
        idp = auth.identityProvider,
        sp = auth.serviceProvider;
    if (!idp.identity ||
        !idp.spInitiatedUrl ||
        !idp.signingCert ||
        !sp.identity ||
        !sp.desiredSubjectFormat) {
      return false;
    }
    return true;
  }
};
