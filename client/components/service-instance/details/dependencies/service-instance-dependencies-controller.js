module.exports = function(app) {

  app.controller('ServiceInstanceDependenciesController', serviceInstanceDependenciesController);

  /* @ngInject */
  function serviceInstanceDependenciesController($scope, dataService, $stateParams) {
    $scope.dependenciesStatus = 'loading';
    var siKey = $stateParams.key;
    var path = '/serviceInstances/search/findByName?name=' + siKey;
    var successHandler = function(res) {
      dataService.get(res.data._links.dependencies.href)
        .then(function(res) {
          $scope.dependencies = res.data._embedded.serviceInstanceDependencies;
          $scope.dependenciesStatus = 'loaded';
        });
      
    };
    var errorHandler = function() {
      $scope.dependenciesStatus = 'error';
    };
    dataService.get(path)
      .then(successHandler, errorHandler);
  }
};
