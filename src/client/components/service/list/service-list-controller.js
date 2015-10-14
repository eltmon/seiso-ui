var pagingController = require('../../util/paging-controller');

module.exports = function(app) {
  app.controller('ServiceListController', pagingController('Services', '/services?', 'key'));

};
