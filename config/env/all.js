
var path = require('path');

module.exports = {
  applicationName: '',
  accessLog: {
    fileSize: '1m',
    keep: 10,
    compress: true
  },
  auth: {
    // passport-saml configuration
    secured: (process.env.NODE_ENV === 'dev' ? false : true),
    strategy: 'saml',
    acceptableClockSkewInMs: 360000,
    callbackProtocol: 'https',
    identityProvider: {
      name: '',
      identity: '',
      spInitiatedUrl: '',
      signingCert: ''
    },
    serviceProvider: {
      name: '',
      identity: '',
      desiredSubjectFormat: ''
    }
  },
  hostingEnvironment: '',
  sessionSecret: 'secret',
  client: {
    // Used for both server public directory and gulp build output directory.
    publicDir: path.resolve(__dirname + '/../../static')
  },
  externalApis: {
    eos: []
  }
};
