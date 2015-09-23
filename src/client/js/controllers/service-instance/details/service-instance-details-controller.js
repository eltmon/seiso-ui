var pageTitle = require('../../../util').pageTitle;

module.exports = function(app) {

	app.controller('ServiceInstanceDetailsController', serviceInstanceDetailsController);

	serviceInstanceDetailsController.$inject = ['$scope', 'v2Api', '$http', '$routeParams'];

	function serviceInstanceDetailsController($scope, v2Api, $http, $routeParams) {
		$scope.serviceInstanceStatus = 'loading';
		var serviceInstanceKey = $routeParams.key;
		var path = '/v2/service-instances/' + serviceInstanceKey;
		var successHandler = function(data) {
			var serviceInstance = data;
			var siEmbedded = serviceInstance._embedded;
			var service = siEmbedded.service;
			$scope.serviceInstance = serviceInstance;
			$scope.model.page.title = pageTitle(serviceInstance.key);
			$scope.dataCenter = siEmbedded.dataCenter;
			$scope.environment = siEmbedded.environment;
			$scope.ipAddressRoles = siEmbedded.ipAddressRoles;
			$scope.loadBalancer = siEmbedded.loadBalancer;
			$scope.ports = siEmbedded.ports;
			$scope.service = service;
			$scope.owner = service._embedded.owner;
			$scope.dashboards = siEmbedded.dashboards;
			$scope.checks = siEmbedded.seyrenChecks;
			
			$scope.tabs = [
				{ heading: 'Dashboard', content: 'dashboard/index' },
				{ heading: 'All Nodes', content: 'nodes/node-pane' },
				{ heading: 'Details', content: 'details/index' },
				{ heading: 'Dependencies', content: 'dependencies/dependencies-tables' }
			];
			
			if ($scope.globals.enableActions) {
				$scope.tabs.push({ heading: 'Actions', content: 'eos-actions/index' });
			}
			
			$scope.setTabContent = function(name) {
				$scope.tabContentUrl = 'view/items/service-instance/details/' + name + '.html';
			};
		
			$scope.serviceInstanceStatus = 'loaded';
		};
		var errorHandler = function() {
			$scope.serviceInstanceStatus = 'error';
		};
		v2Api.get(path, successHandler, errorHandler);
	}
};
