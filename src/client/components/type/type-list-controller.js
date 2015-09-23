var ListController = require('../util/paging-controller');

module.exports = function(app) {
  app.controller('TypeListController', new ListController('Types', '/v2/service-types'));
};
