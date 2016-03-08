module.exports.config = {
  framework: 'mocha',
  seleniumAdress: 'http://localhost:4444/wd/hub',
  specs: [
    'main.spec.js',
  ],
  capabilities: {
    browserName: 'chrome'
  },
  mochaOpts: {
    // reports: 'spec',
    slow: 6000
  }
};