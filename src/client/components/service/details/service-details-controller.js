var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('ServiceDetailsController', ServiceDetailsController);

  /* @ngInject */
  function ServiceDetailsController($scope, $routeParams, DataService) {
    $scope.serviceStatus = 'loading';
    $scope.viewing = $routeParams.key;
    var path = '/services/search/findByKey?key=' + $routeParams.key + '&projection=serviceDetails';
    var Services = new DataService(path);
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

    Services.get(function(err, res) {
      if (err) return errorHandler();
      successHandler(res);
    });
  }
};
