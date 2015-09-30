var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('ServiceDetailsController', serviceDetailsController);

  serviceDetailsController.$inject = ['$scope', '$routeParams', '$http'];

  function serviceDetailsController($scope, $routeParams, $http) {
    $scope.serviceStatus = 'loading';
    $scope.viewing = $routeParams.key;
    var path = 'http://localhost:8080/services/search/findByKey?key=' + $routeParams.key + '&projection=serviceDetails';
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
    $http.get(path)
      .then(successHandler, errorHandler);
  }
};
