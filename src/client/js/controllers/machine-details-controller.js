module.exports = function(app) {

	app.controller('MachineDetailsController', machineDetailsController);

	machineDetailsController.$inject = ['$scope', '$http', '$routeParams'];

	function machineDetailsController($scope, $http, $routeParams) {
		$http.get('/v1/machines/' + $routeParams.name)
				.success(function(data) {
					$scope.model.page.title = pageTitle(data.name);
					$scope.machine = data;
					$scope.nodes = data.nodes;
				})
				.error(function() { alert('Error while getting machine.'); });
	}
};