var ListController = require('./paging-controller.js');

module.exports = function(app) {
	app.controller('TypeListController', ListController(app, 'Types', '/v2/service-types'));
};
