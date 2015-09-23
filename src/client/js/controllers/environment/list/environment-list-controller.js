
var ListController = require('../../list-controller.js');

module.exports = function(app) {
  app.controller('EnvironmentListController', new ListController('Environments', '/v2/environments'));
};