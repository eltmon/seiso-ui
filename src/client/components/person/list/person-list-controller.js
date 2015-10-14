var pagingController = require('../../util/paging-controller.js');

module.exports = function(app) {
	app.controller('PersonListController', pagingController('People', '/persons?', 'lastName,firstName'));
};
