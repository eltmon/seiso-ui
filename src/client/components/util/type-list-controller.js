var ListController = require('./paging-controller.js');

module.exports = function(app) {
  app.controller('TypeListController', new ListController('Types', '/v2/service-types'));
};
