var PagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
	app.controller('ServiceInstanceListController', PagingController('Service Instances', 'serviceInstances', 'key'));
};
