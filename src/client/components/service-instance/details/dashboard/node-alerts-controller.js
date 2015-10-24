var nodePageToNodeRows = require('../../../util/ng-mappers').nodePageToNodeRows;

module.exports = function(app) {

  app.controller('NodeAlertsController', nodeAlertsController);

  /* @ngInject */
  function nodeAlertsController($scope, dataService, paginationConfig, $stateParams) {
    $scope.model.nodeAlerts = {
      currentPage: 1,
      pageSelected: function() {
        $scope.nodeAlertsStatus = 'loading';
        var pageNumber = $scope.model.nodeAlerts.currentPage;
        var apiPageNumber = pageNumber - 1;
        var path = '/nodes/search/findNodeAlertsByServiceInstance?key=' + 
          $stateParams.key + '&view=serviceInstanceNodes&page=' + apiPageNumber + 
          '&size=' + paginationConfig.itemsPerPage + '&sort=name';

        var successHandler = function(res) {
          console.log('node alerts res: ', res);
          $scope.nodeAlertsPage = res.data._embedded;
          $scope.metadata = $scope.nodeAlertsPage.metadata;
          $scope.nodeRows = nodePageToNodeRows($scope.nodeAlertsPage);
          $scope.nodeAlerts = $scope.nodeAlertsPage.nodes;
          $scope.nodeAlertsStatus = 'loaded';
        };
        var errorHandler = function() { $scope.nodeAlertsStatus = 'error'; };

        dataService.get(path).then(successHandler, errorHandler);
      }
    };
    $scope.model.nodeAlerts.pageSelected();
  }
};
