var nodePageToNodeRows = require('../../../util/ng-mappers').nodePageToNodeRows;

module.exports = function(app) {

  app.controller('NodeAlertsController', nodeAlertsController);

  nodeAlertsController.$inject = ['$scope', 'v2Api', 'paginationConfig', '$routeParams'];

  function nodeAlertsController($scope, v2Api, paginationConfig, $routeParams) {
    $scope.model.nodeAlerts = {
      currentPage: 1,
      pageSelected: function() {
        $scope.nodeAlertsStatus = 'loading';
        var pageNumber = $scope.model.nodeAlerts.currentPage;
        var apiPageNumber = pageNumber - 1;
        var path = 'http://localhost:8080/nodes/search/findNodeAlertsByServiceInstance?key=' + 
          $routeParams.key + '&view=serviceInstanceNodes&page=' + apiPageNumber + 
          '&size=' + paginationConfig.itemsPerPage + '&sort=name';
        var successHandler = function(data) {
          $scope.nodeAlertsPage = data;
          $scope.metadata = $scope.nodeAlertsPage.metadata;
          $scope.nodeRows = nodePageToNodeRows($scope.nodeAlertsPage);
          $scope.nodeAlerts = $scope.nodeAlertsPage._embedded.items;
          $scope.nodeAlertsStatus = 'loaded';
        };
        var errorHandler = function() { $scope.nodeAlertsStatus = 'error'; };
        v2Api.get(path, successHandler, errorHandler);
      }
    };
    $scope.model.nodeAlerts.pageSelected();
  }
};
