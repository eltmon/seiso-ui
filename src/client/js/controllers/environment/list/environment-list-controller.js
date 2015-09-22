
var ListController = require('../../list-controller.js');

module.exports = function(app) {
	app.controller('EnvironmentListController', ListController(app, 'Environments', '/v2/environments'));
};