
module.exports = {

  isactive: function(req, res) {
    res.setHeader('cache-control', 'no-cache');
    res.status(200).send('ACTIVE');
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
