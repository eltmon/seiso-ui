var PagingController = require('../../paging-controller.js');

module.exports = function(app) {
	app.controller('PersonListController', new PagingController('People', '/v1/people', 'lastname, firstname'));
};