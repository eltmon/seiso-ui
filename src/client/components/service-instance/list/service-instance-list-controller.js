var pagingController = require('../../util/paging-controller');

module.exports = function(app) {
	app.controller('ServiceListController', pagingController('Service Instances', '/v1/service-instances', 'key'));
};
