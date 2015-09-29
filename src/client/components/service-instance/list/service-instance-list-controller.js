var pagingController = require('../../util/paging-controller');

module.exports = function(app) {
	app.controller('ServiceInstanceListController', pagingController('Service Instances', '/serviceInstances', 'key'));
};
