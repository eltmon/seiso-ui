var async = require('async');

module.exports = function(app) {

  app.controller('ServiceServiceInstancesController', serviceServiceInstancesController);

  serviceServiceInstancesController.$inject = ['$scope', 'v2Api', '$routeParams', '$http'];

  function serviceServiceInstancesController($scope, v2Api, $routeParams, $http) {
    $scope.serviceInstancesStatus = 'loading';

    $scope.$on('onService', function(event) {
      $scope.service = event.targetScope.service;
      var siUrl = $scope.service._links.serviceInstances.href;
      $http.get(siUrl + '?projection=serviceServiceInstances')
        .then(function(res) {
          console.log('si res: ', res);
          $scope.serviceInstances = res.data._embedded.serviceInstances;
          console.log($scope.serviceInstances);
          $scope.serviceInstancesStatus = 'loaded';
        }, function(err) {
          console.log(err);
          $scope.serviceInstancesStatus = 'error';
        });
    });

  }
};
