var pagingController = require('../../util/paging-controller');

module.exports = function(app) {
	app.controller('LoadBalancerListController', pagingController('Load Balancers', '/v1/load-balancers', 'name'));
};