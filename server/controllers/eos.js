
var http = require('http'),
    config = require('../../config').externalApis,
    eosEndpoint = config.eos;

module.exports = {

  convict: (req, res) => {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Convict', payload, res);
  },

  deploy: (req, res) => {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Deploy', payload, res);
  },

  interrogate: (req, res) => {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Interrogate', payload, res);
  },

  maintenanceMode: (req, res) => {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('MaintenanceMode', payload, res);
  },

  reload: (req, res) => {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('Reload', payload, res);
  },

  setActive: (req, res) => {
    console.log(req.body);
    var payload = req.body;
    initiateRequest('SetActive', payload, res);
  },

  soak: (req, res) => {
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
