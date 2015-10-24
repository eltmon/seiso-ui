var pageTitle = require('../../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('NodeDetailsController', nodeDetailsController);

  /* @ngInject */
  function nodeDetailsController($scope, dataService, $stateParams) {
    var successHandler = function(data) {
      console.log('node details controller: ', data);
      $scope.model.page.title = pageTitle(data.name);
      $scope.node = data;
      if ($scope.node !== null) {
        $scope.serviceInstance = $scope.node.serviceInstance;
        if ($scope.serviceInstance !== null) {
          $scope.service = $scope.serviceInstance.service;
          $scope.owner = $scope.service.owner;
          if ($scope.owner !== null) {
            $scope.owner.fullName = $scope.displayName($scope.owner);
          }
          $scope.environment = $scope.serviceInstance.environment;
          $scope.dataCenter = $scope.serviceInstance.dataCenter;
          if ($scope.dataCenter !== null) {
            $scope.region = $scope.dataCenter.region;
            if ($scope.region !== null) {
              $scope.infrastructureProvider = $scope.region.infrastructureProvider;
            }
          }
          $scope.machine = $scope.node.machine;
        }
      }
    };
    
    dataService.get('/nodes/search/findByKey?key=' + $stateParams.name)
        .then(successHandler, function() { console.log('Error while getting node.');});
  }
};
