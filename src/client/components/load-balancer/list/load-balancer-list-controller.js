var pagingController = require('../../util/paging-controller');

module.exports = function(app) {
	app.controller('LoadBalancerListController', pagingController('Load Balancers', 'http://localhost:8080/loadBalancers?projection=loadBalancersList', 'name'));
};