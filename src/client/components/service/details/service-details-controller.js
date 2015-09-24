var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('ServiceDetailsController', serviceDetailsController);

  serviceDetailsController.$inject = ['$scope', 'v2Api', '$routeParams', '$http'];

  function serviceDetailsController($scope, v2Api, $routeParams, $http) {
    $scope.serviceStatus = 'loading';
    $scope.viewing = $routeParams.key;
    var path = 'http://localhost:8080/services/search/findByKey?key=' + $routeParams.key;
    var successHandler = function(data) {
      console.log(data);
      var service = data;
      $scope.model.page.title = pageTitle(data.name);
      $scope.service = service;

      $http.get(service._links.group.href)
        .then(function(res) {
          console.log('service group data: ', res.data.key);
          $scope.serviceGroup = res.data.key;
        }, function(err) {
          console.log(err);
        });

      $http.get(service._links.type.href)
        .then(function(res) {
          $scope.serviceType = res.data.key;
        }, function(err) {
          console.log(err);
        });

      $http.get(service._links.owner.href)
        .then(function(res) {
          $scope.serviceType = res.data.key;
        }, function(err) {
          console.log(err);
        });

      $scope.serviceStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.serviceStatus = 'error';
    };
    v2Api.get(path, successHandler, errorHandler);
  }
};
