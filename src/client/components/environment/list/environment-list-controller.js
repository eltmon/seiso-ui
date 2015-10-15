var PagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
  app.controller('EnvironmentListController', PagingController('Environments', 'environments', 'name'));
};
