var PagingController = require('../../paging-controller.js');

module.exports = function(app) {
	app.controller('LoadBalancerListController', PagingController(app, 'Load Balancers', '/v1/load-balancers', 'name'));
};