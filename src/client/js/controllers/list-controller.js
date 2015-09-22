module.exports = function(app, title, path) {

	app.controller('ListController', listController);

	listController.$inject = ['$scope', 'v2Api'];

	function listController($scope, v2Api) {
		$scope.listStatus = 'loading';
		$scope.model.page.title = pageTitle(title);
		var successHandler = function(data) {
			$scope.items = data._embedded.items;
			$scope.listStatus = 'loaded';
		}
		var errorHandler = function() {
			$scope.listStatus = 'error';
		}
		v2Api.get(path, successHandler, errorHandler);
	}
};