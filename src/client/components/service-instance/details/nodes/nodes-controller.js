var nodePageToNodeRows = require('../../../util/ng-mappers.js').nodePageToNodeRows;

module.exports = function(app) {
  app.controller('ServiceInstanceNodesController', serviceInstanceNodesController);

  /* @ngInject */  
  function serviceInstanceNodesController($scope, dataService, paginationConfig, $routeParams) {
    $scope.model.nodes = {
      currentPage: 1,
      pageSelected: function() {
        $scope.nodeListStatus = 'loading';
        var pageNumber = $scope.model.nodes.currentPage;
        var apiPageNumber = pageNumber - 1;
        var requestUrl = '/nodes/search/findByServiceInstanceKey?key=' + $routeParams.key
          + '&view=service-instance-nodes'
          + '&page=' + apiPageNumber 
          + '&size=' + paginationConfig.itemsPerPage 
          + '&sort=name';

        var successHandler = function(res) {
          console.log('si nodes ctrl:', res);
          var nodePage = res.data.page;
          $scope.metadata = nodePage.metadata;
          $scope.nodeRows = nodePageToNodeRows(nodePage);
          $scope.nodeListStatus = 'loaded';
        };

        dataService.get(requestUrl).then(successHandler, function(err) {
          return console.log(err);
        });
      }
    };

    $scope.model.nodes.pageSelected();
  }
};
