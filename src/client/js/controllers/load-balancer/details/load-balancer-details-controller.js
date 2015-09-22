
module.exports = function(app) {

	app.controller('LoadBalancerDetailsController', loadBalancerDetailsController);

	loadBalancerDetailsController.$inject = ['$scope', '$http', '$routeParams'];

	function loadBalancerDetailsController($scope, $http, $routeParams) {
		// TODO Move to service
		$http.get('/v1/load-balancers/' + $routeParams.name)
				.success(function(data) {
					$scope.model.page.title = pageTitle(data.name);
					$scope.loadBalancer = data;
				})
				.error(function() { alert('Error while getting load balancer.'); });
		$http.get('/v1/load-balancers/' + $routeParams.name + '?view=service-instances')
				.success(function(data) { $scope.serviceInstances = data.serviceInstances; })
				.error(function() { alert('Error while getting service instances.'); });
	}
};