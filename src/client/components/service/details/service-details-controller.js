var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('ServiceDetailsController', ServiceDetailsController);

  /* @ngInject */
  function ServiceDetailsController($scope, $stateParams, dataService) {
    $scope.serviceStatus = 'loading';
    $scope.viewing = $stateParams.key;
    var path = '/services/search/findByKey?key=' + $stateParams.key + '&projection=serviceDetails';

    var successHandler = function(res) {
      var service = res.data;
      $scope.model.page.title = pageTitle(res.data.name);

      $scope.service = service;
      $scope.serviceGroup = res.data.group;
      $scope.serviceType = res.data.type;
      $scope.serviceOwner = res.data.owner;
      $scope.docLinks = res.data.docLinks;
      $scope.serviceInstances = res.data.serviceInstances;

      $scope.$broadcast('onService');
      $scope.serviceStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.serviceStatus = 'error';
    };

    dataService.get(path).then(successHandler, errorHandler);
  }
};
