'use strict';

var chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect,
  config = require('../../../config');

var selfAddress = 'http://localhost:3001';

// TO RUN:
// $ webdriver-manager start
// $ npm run build:dev
// $ npm run start:dev
// $ protractor client/test/e2e/config.js


console.log(selfAddress);
chai.use(chaiAsPromised);

// Configuration with mocha:
// https://github.com/angular/protractor/blob/master/spec/mocha/lib_spec.js

describe('protractor is running', function() {

  it('should be able to run', function() {
    expect(true).to.equal(true);
  });

  it('should expose the correct global variables', function() {
      expect(protractor).to.exist;
      expect(browser).to.exist;
      expect(by).to.exist;
      expect(element).to.exist;
      expect($).to.exist;
    });
});


// INFO: mocha options can be set by referring to 'this', 
// see: https://stackoverflow.com/questions/16607039/in-mocha-testing-while-calling-asynchronous-function-how-to-avoid-the-timeout-er
describe('e2e tests', function() {
  this.timeout(4000);
  it('should have a title', function(done) {
    browser.get(selfAddress);

    // TODO: Determine the convention here when the expect statements are all promises.
    // Assuming there may be cases where chaining will occur. As is, this is ugly. [IDM]
    expect(browser.getTitle()).to.eventually.equal('Home - Seiso')
      .then(() => {done();});
  });
});
