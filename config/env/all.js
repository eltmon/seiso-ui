
module.exports = {
  applicationName: '',
  accessLog: {
    fileSize: '1m',
    keep: 10,
    compress: true
  },
  auth: {
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
      desiredSubjectFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
    }
  },
  hostingEnvironment: '',
  sessionSecret: 'secret'
};
