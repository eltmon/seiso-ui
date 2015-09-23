
var listController = require('../../util/list-controller');

module.exports = function(app) {
  app.controller('EnvironmentListController', listController('Environments', '/v2/environments'));
};