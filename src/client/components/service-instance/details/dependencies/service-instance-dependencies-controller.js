module.exports = function(app) {

  app.controller('ServiceInstanceDependenciesController', serviceInstanceDependenciesController);

  /* @ngInject */
  function serviceInstanceDependenciesController($scope, dataService, $routeParams) {
    $scope.dependenciesStatus = 'loading';
    var siKey = $routeParams.key;
    var path = '/serviceInstanceDependencies/search/findByDependencyKey?key=' + siKey;
    var successHandler = function(res) {
      console.log(res);
      $scope.dependencies = res.data._embedded.serviceInstanceDependencies;
      $scope.dependenciesStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.dependenciesStatus = 'error';
    };
    dataService.get(path)
      .then(successHandler, errorHandler);
  }
};
