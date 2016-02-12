var PagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
  app.controller('PersonListController', PagingController('People', 'persons', null, 'lastName,firstName'));
};
