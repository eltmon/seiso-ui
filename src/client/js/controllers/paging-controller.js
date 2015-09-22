module.exports = function(app, title, path, sortKey) {

	app.controller('PagingController', pagingController);

	pagingController.$inject = ['$scope', 'paginationConfig', 'v1Api'];

	function pagingController($scope, paginationConfig, v1Api) {
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
	}
};
