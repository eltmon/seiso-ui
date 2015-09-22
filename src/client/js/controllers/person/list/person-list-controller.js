var PagingController = require('../../paging-controller.js');

module.exports = function(app) {
	app.controller('PersonListController', PagingController(app, 'People', '/v1/people', 'lastname, firstname'));
};