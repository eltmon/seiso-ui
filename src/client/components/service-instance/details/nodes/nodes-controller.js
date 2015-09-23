var nodePageToNodeRows = require('../../../util/ng-mappers.js').nodePageToNodeRows;

module.exports = function(app) {
  app.controller('ServiceInstanceNodesController', serviceInstanceNodesController);

  serviceInstanceNodesController.$inject = ['$scope', '$http', 'paginationConfig', '$routeParams'];
  
  function serviceInstanceNodesController($scope, $http, paginationConfig, $routeParams) {
    $scope.model.nodes = {
      currentPage: 1,
      pageSelected: function() {
        $scope.nodeListStatus = 'loading';
        var pageNumber = $scope.model.nodes.currentPage;
        var apiPageNumber = pageNumber - 1;

        var requestUrl = '/v2/nodes/search/find-by-service-instance?key=' + 
          $routeParams.key + '&view=service-instance-nodes&page=' + apiPageNumber + '&size=' + 
          paginationConfig.itemsPerPage + '&sort=name';

        var request = {
          method: 'GET',
          url: requestUrl,
          headers: { 'Accept': 'application/hal+json' }
        };
        var successHandler = function(data) {
          var nodePage = data;
          $scope.metadata = nodePage.metadata;
          $scope.nodeRows = nodePageToNodeRows(nodePage);
          $scope.nodeListStatus = 'loaded';
        };
        $http(request)
            .success(successHandler)
            .error(function() { $scope.nodeListStatus = 'error'; });
      }
    };
    $scope.model.nodes.pageSelected();
  }
};
