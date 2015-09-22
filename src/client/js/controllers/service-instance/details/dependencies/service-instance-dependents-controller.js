module.exports = function(app) {

	app.controller('ServiceInstanceDependentsController', serviceInstanceDependentsController);

	serviceInstanceDependentsController.$inject = ['$scope', 'v2Api', '$routeParams'];

	function serviceInstanceDependentsController($scope, v2Api, $routeParams) {
		$scope.dependentsStatus = 'loading';
		var siKey = $routeParams.key;
		var path = "/v2/service-instance-dependencies/search/find-by-dependency?key=" + siKey;
		var successHandler = function(data) {
			$scope.dependents = data._embedded.items;
			$scope.dependentsStatus = 'loaded';
		};
		var errorHandler = function() {
			$scope.dependentsStatus = 'error';
		};
		v2Api.get(path, successHandler, errorHandler);
	}
};
