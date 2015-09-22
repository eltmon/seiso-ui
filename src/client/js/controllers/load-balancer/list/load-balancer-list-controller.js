var PagingController = require('../../paging-controller.js');

module.exports = function(app) {
	app.controller('LoadBalancerListController', PagingController('Load Balancers', '/v1/load-balancers', 'name'));
};