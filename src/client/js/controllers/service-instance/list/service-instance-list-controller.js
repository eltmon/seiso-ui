var PagingController = require('../../paging-controller.js');

module.exports = function(app) {
	app.controller('ServiceListController', PagingController('Service Instances', '/v1/service-instances', 'key'));
};