var pagingController = require('../../util/paging-controller');

module.exports = function(app) {
	app.controller('ServiceInstanceListController', pagingController('Service Instances', 'http://localhost:8080/serviceInstances?projection=serviceServiceInstances&', 'key'));
};
