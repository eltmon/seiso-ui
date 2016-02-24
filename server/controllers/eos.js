
var http = require('http'),
    config = require('../../config/config');

var eosEndpoint = require('../../config/config').apis.eos;

module.exports = {

  convict: (req, res) => {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Convict', payload, res);
  },

  deploy: function(req, res) {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Deploy', payload, res);
  },

  interrogate: function(req, res) {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Interrogate', payload, res);
  },

  maintenanceMode: function(req, res) {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('MaintenanceMode', payload, res);
  },

  reload: function(req, res) {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Reload', payload, res);
  },

  setActive: function(req, res) {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('SetActive', payload, res);
  },

  soak: function(req, res) {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Soak', payload, res);
  }
};

function reqOptionsAtPath(path) {
  return {
    hostname: config.apis.eos,
    port: 80,
    path: '/eos/ServiceInstances' + path,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }
  };
}

function initiateRequest(path, payload, res) {
  var options = reqOptionsAtPath(`/${payload.id}/${path}`);
  delete payload.id;
  requestHandler(options, payload, (err, resData) => {
    if (err) return res.sendStatus(500);
    res.sendStatus(200).json(resData);
  });
}

function requestHandler(options, payload, cb) {
  var eosReq = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    var resBody = '';
    res.on('data', (chunk) => {
      resBody += chunk;
    });
    res.on('end', () => {
      cb(null, resBody);
    });
  });

  eosReq.on('error', (e) => {
    cb(e);
  });

  eosReq.write(payload);
  eosReq.end();
}
