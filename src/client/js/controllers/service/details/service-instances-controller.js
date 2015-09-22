module.exports = function(app) {

	app.controller('ServiceServiceInstancesController', serviceServiceInstancesController);

	serviceServiceInstancesController.$inject = ['$scope', 'v2Api', '$routeParams'];

	function serviceServiceInstancesController($scope, v2Api, $routeParams) {
		$scope.serviceInstancesStatus = 'loading';
		var path = "/v2/service-instances/search/find-by-service?key=" + $routeParams.key;
		var successHandler = function(data) {
			$scope.serviceInstances = data._embedded.items;
			$scope.serviceInstancesStatus = 'loaded';
		};
		var errorHandler = function() {
			$scope.serviceInstancesStatus = 'error';
		};
		v2Api.get(path, successHandler, errorHandler);
	}
};