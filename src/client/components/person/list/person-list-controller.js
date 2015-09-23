var pagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
	app.controller('PersonListController', pagingController('People', '/v1/people', 'lastname, firstname'));
};