var pageTitle = require('./util').pageTitle;

module.exports = function(title, basePath, sortKey) {

  function pagingController($scope, paginationConfig, $http) {
    $scope.model.page.title = pageTitle(title);
    var pageSize = paginationConfig.itemsPerPage;
    
    var successHandler = function(res, status, headers) {
      console.log(res);
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
    };
    
    $scope.model.pageSelected = function() {
      var pageNumber = $scope.model.currentPage - 1;
      var logMsg = 'Page selected: path=' + path + 
        ', pageNumber=' + pageNumber + 
        ', pageSize=' + pageSize + ', sort=' + sortKey;
      var path = basePath + 'page=' + pageNumber + '&size=' + pageSize + '&sort=' + sortKey; 
      $http.get(path)
        .then(successHandler, function() { console.log('Error while getting page.'); });
    };
    
    // Initialize first page
    $scope.model.currentPage = 1;
    $scope.model.pageSelected();
  }

  return ['$scope', 'paginationConfig', '$http', pagingController];
};
