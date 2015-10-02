module.exports = function(app) {

  app.controller('ServiceInstanceDependenciesController', serviceInstanceDependenciesController);

  serviceInstanceDependenciesController.$inject = ['$scope', '$http', '$routeParams'];
  
  function serviceInstanceDependenciesController($scope, $http, $routeParams) {
    $scope.dependenciesStatus = 'loading';
    var siKey = $routeParams.key;
    var path = 'http://localhost:8080/serviceInstanceDependencies/search/findByDependencyKey?key=' + siKey;
    var successHandler = function(res) {
      console.log(res);
      $scope.dependencies = res.data._embedded.serviceInstanceDependencies;
      $scope.dependenciesStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.dependenciesStatus = 'error';
    };
    $http.get(path)
      .then(successHandler, errorHandler);
  }
};
