var PagingController = require('../../paging-controller.js');

module.exports = function(app) {
	app.controller('ServiceInstanceListController', PagingController(app, 'Service Instances', '/v1/service-instances', 'key'));
};