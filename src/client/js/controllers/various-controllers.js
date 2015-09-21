// TODO For errors, do something better than alert dialogs. :D

var pageTitle = function(baseTitle) {
	return baseTitle + " - Seiso";
}

var listController = function(title, path) {
	var controller = function($scope, v2Api) {
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
	};
	return [ '$scope', 'v2Api', controller ];
};

var pagingController = function(title, path, sortKey) {
	var controller = function($scope, paginationConfig, v1Api) {
		$scope.model.page.title = pageTitle(title);
		var pageSize = paginationConfig.itemsPerPage;
		
		var successHandler = function(data, status, headers) {
			var totalItems = headers('X-Pagination-TotalElements');
			var totalPages = headers('X-Pagination-TotalPages');
			
			// FIXME Handle no-items case [WLW]
			var lowerIndex = ($scope.model.currentPage - 1) * pageSize + 1;
			var upperIndex = Math.min(totalItems, $scope.model.currentPage * pageSize);
			
			$scope.totalItems = totalItems;
			$scope.totalPages = totalPages;
			$scope.lowerIndex = lowerIndex;
			$scope.upperIndex = upperIndex;
			$scope.items = data;
		};
		
		$scope.model.pageSelected = function() {
			var pageNumber = $scope.model.currentPage - 1;
			console.log("Page selected: path=" + path
					+ ", pageNumber=" + pageNumber
					+ ", pageSize=" + pageSize
					+ ", sortKey=" + sortKey);
			v1Api.getPage(path, pageNumber, pageSize, sortKey)
					.success(successHandler)
					.error(function() { alert('Error while getting page.'); });
		};
		
		// Initialize first page
		$scope.model.currentPage = 1;
		$scope.model.pageSelected();
	};
	
	return [ '$scope', 'paginationConfig', 'v1Api', controller ];
};

var loadBalancerDetailsController = function() {
	var controller = function($scope, $http, $routeParams) {
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
	};
	return [ '$scope', '$http', '$routeParams', controller ];
};

var machineDetailsController = function() {
	var controller = function($scope, $http, $routeParams) {
		$http.get('/v1/machines/' + $routeParams.name)
				.success(function(data) {
					$scope.model.page.title = pageTitle(data.name);
					$scope.machine = data;
					$scope.nodes = data.nodes;
				})
				.error(function() { alert('Error while getting machine.'); });
	};
	return [ '$scope', '$http', '$routeParams', controller ];
};

var nodeDetailsController = function() {
	var controller = function($scope, $http, $routeParams) {
		var successHandler = function(data) {
			$scope.model.page.title = pageTitle(data.name);
			$scope.node = data;
			if ($scope.node != null) {
				$scope.serviceInstance = $scope.node.serviceInstance;
				if ($scope.serviceInstance != null) {
					$scope.service = $scope.serviceInstance.service;
					$scope.owner = $scope.service.owner;
					if ($scope.owner != null) {
						$scope.owner.fullName = $scope.displayName($scope.owner);
					}
					$scope.environment = $scope.serviceInstance.environment;
					$scope.dataCenter = $scope.serviceInstance.dataCenter;
					if ($scope.dataCenter != null) {
						$scope.region = $scope.dataCenter.region;
						if ($scope.region != null) {
							$scope.infrastructureProvider = $scope.region.infrastructureProvider;
						}
					}
					$scope.machine = $scope.node.machine;
				}
			}
		};
		
		$http.get('/v1/nodes/' + $routeParams.name)
				.success(successHandler)
				.error(function() { alert('Error while getting node.'); });
	};
	return [ '$scope', '$http', '$routeParams', controller ];
};

var personDetailsController = function() {
	var controller = function($scope, $http, $routeParams) {
		var successHandler = function(data) {
			var fullName = $scope.displayName(data);
			$scope.model.page.title = pageTitle(fullName);
			$scope.person = data;
			$scope.person.firstNameLastName = fullName;
		};
		$http.get('/v2/people/' + $routeParams.username, { headers: { 'Accept': 'application/hal+json' } })
				.success(successHandler)
				.error(function() { alert('Error while getting person.'); })
	};
	return [ '$scope', '$http', '$routeParams', controller ];
};

var statusListController = function() {
	var controller = function($scope, $http) {
		$scope.model.page.title = pageTitle('Statuses');
		
		// TODO Handle errors
		$http.get('/v1/status-types')
				.success(function(data) { $scope.statusTypes = data; });
		$http.get('/v1/health-statuses')
				.success(function(data) { $scope.healthStatuses = data; });
		$http.get('/v1/rotation-statuses')
				.success(function(data) { $scope.rotationStatuses = data; });
	};
	return [ '$scope', '$http', controller ];
};
