module.exports = function(app) {

  app.controller('ServiceInstanceDependentsController', serviceInstanceDependentsController);

  serviceInstanceDependentsController.$inject = ['$scope', '$http', '$routeParams'];

  function serviceInstanceDependentsController($scope, $http, $routeParams) {
    $scope.dependentsStatus = 'loading';
    var siKey = $routeParams.key;
    var path = 'http://localhost:8080/serviceInstanceDependents/search/findByDependentKey?key=' + siKey;
    var successHandler = function(res) {
      console.log(res);
      $scope.dependents = res.data._embedded.serviceInstanceDependencies;
      $scope.dependentsStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.dependentsStatus = 'error';
    };
    $http.get(path)
      .then(successHandler, errorHandler);
  }
};
