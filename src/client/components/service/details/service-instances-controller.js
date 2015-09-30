var async = require('async');

module.exports = function(app) {

  app.controller('ServiceServiceInstancesController', serviceServiceInstancesController);

  serviceServiceInstancesController.$inject = ['$scope', '$routeParams', '$http'];

  function serviceServiceInstancesController($scope, $routeParams, $http) {
    $scope.serviceInstancesStatus = 'loading';

    $scope.$on('onService', function(event) {
      $scope.service = event.targetScope.service;
      var successHandler = function(res) {
        $scope.serviceInstances = res.data._embedded.serviceInstances;
        $scope.serviceInstancesStatus = 'loaded';
      };
      var errorHandler = function(res) {
        $scope.serviceInstancesStatus = 'error';
      };
      $http.get(event.targetScope.service._links.serviceInstances.href + '?projection=serviceServiceInstances')
        .then(successHandler, errorHandler);
    });
  }
};
