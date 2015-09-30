var pagingController = require('../../util/paging-controller');

module.exports = function(app) {
  app.controller('ServiceListController', pagingController('Services', 'http://localhost:8080/services?', 'key'));

};
