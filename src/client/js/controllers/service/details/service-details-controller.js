module.exports = function(app) {

	app.controller('ServiceDetailsController', serviceDetailsController);

	serviceDetailsController.$inject = ['$scope', 'v2Api', '$routeParams'];

	function serviceDetailsController($scope, v2Api, $routeParams) {
		$scope.serviceStatus = 'loading';
		var path = "/v2/services/" + $routeParams.key;
		var successHandler = function(data) {
			var service = data;
			$scope.model.page.title = pageTitle(data.name);
			$scope.service = service;
			$scope.serviceGroup = service._embedded.group;
			$scope.serviceType = service._embedded.type;
			$scope.serviceOwner = service._embedded.owner;
			$scope.serviceStatus = 'loaded';
		};
		var errorHandler = function() {
			$scope.serviceStatus = 'error';
		};
		v2Api.get(path, successHandler, errorHandler);
	}
};
