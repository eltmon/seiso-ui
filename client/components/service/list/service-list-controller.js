var PagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
  app.controller('ServiceListController', PagingController('Services', 'services', null, 'key'));
};
