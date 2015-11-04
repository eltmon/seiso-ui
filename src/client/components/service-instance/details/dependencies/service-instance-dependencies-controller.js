module.exports = function(app) {

  app.controller('ServiceInstanceDependenciesController', serviceInstanceDependenciesController);

  /* @ngInject */
  function serviceInstanceDependenciesController($scope, dataService, $stateParams) {
    $scope.dependenciesStatus = 'loading';
    var siKey = $stateParams.key;
    var path = '/serviceInstanceDependencies/search/findByKeys?dependecy=' + siKey;
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
