var PagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
	var path = 'serviceInstances';
	var projection = 'serviceInstanceDetails';
	app.controller('ServiceInstanceListController', PagingController('Service Instances', path, projection, 'key'));
};
