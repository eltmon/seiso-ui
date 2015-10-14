var PagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
  app.controller('LoadBalancerListController', PagingController('Load Balancers', 'loadBalancers', 'name'));
};
