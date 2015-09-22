
var ListController = require('../../list-controller.js');

module.exports = function(app) {
	app.controller('EnvironmentListController', ListController('Environments', '/v2/environments'));
};