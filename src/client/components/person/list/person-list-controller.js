var pagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
	app.controller('PersonListController', pagingController('People', 'http://localhost:8080/api/persons?', 'lastName,firstName'));
};
