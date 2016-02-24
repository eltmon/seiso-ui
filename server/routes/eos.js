var eos = require('../controllers/eos');

module.exports = function(router) {
	router.post('/convict', eos.convict);
	router.post('/deploy', eos.deploy);
	router.post('/interrogate', eos.interrogate);
	router.post('/maintenanceMode', eos.maintenanceMode);
	router.post('/setActive', eos.setActive);
	router.post('/soak', eos.soak);
};
