var PagingController = require('../../paging-controller.js');

module.exports = function(app) {
	app.controller('ServiceListController', new PagingController('Service Instances', '/v1/service-instances', 'key'));
};