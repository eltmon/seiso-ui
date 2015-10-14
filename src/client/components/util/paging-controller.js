var pageTitle = require('./util').pageTitle;

module.exports = function(title, basePath, sortKey) {

  /* @ngInject */
  function pagingController($scope, paginationConfig, dataService, $log) {
    var pageSize = paginationConfig.itemsPerPage;
    $scope.model.page.title = pageTitle(title);
    $scope.model.currentPage = 1;
    $scope.model.pageSelected = pageSelected;
    $scope.model.pageSelected();
    
    function pageSelected() {
      var pageNumber = $scope.model.currentPage - 1;
      var path = basePath + 'page=' + pageNumber + '&size=' + pageSize + '&sort=' + sortKey; 
      dataService.get(path).then(success, error);
    }

    function success(res, status, headers) {
      var totalItems = res.data.page.totalElements;
      var totalPages = res.data.page.totalPages;
      
      // FIXME Handle no-items case [WLW]
      var lowerIndex = ($scope.model.currentPage - 1) * pageSize + 1;
      var upperIndex = Math.min(totalItems, $scope.model.currentPage * pageSize);
      
      $scope.totalItems = totalItems;
      $scope.totalPages = totalPages;
      $scope.lowerIndex = lowerIndex;
      $scope.upperIndex = upperIndex;
      for (var key in res.data._embedded) {
        $scope.items = res.data._embedded[key];
      }
    }

    function error() {
      $log.error('Error while getting page.');
    }
  }

  return pagingController;
};
