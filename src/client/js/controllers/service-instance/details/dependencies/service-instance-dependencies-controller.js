module.exports = function(app) {

  app.controller('ServiceInstanceDependenciesController', serviceInstanceDependenciesController);

  serviceInstanceDependenciesController.$inject = ['$scope', 'v2Api', '$routeParams'];
  
  function serviceInstanceDependenciesController($scope, v2Api, $routeParams) {
    $scope.dependenciesStatus = 'loading';
    var siKey = $routeParams.key;
    var path = '/v2/service-instance-dependencies/search/find-by-dependent?key=' + siKey;
    var successHandler = function(data) {
      $scope.dependencies = data._embedded.items;
      $scope.dependenciesStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.dependenciesStatus = 'error';
    };
    v2Api.get(path, successHandler, errorHandler);
  }
};
