module.exports = function(app) {

  app.controller('ServiceInstanceDependentsController', serviceInstanceDependentsController);

  /* @ngInject */
  function serviceInstanceDependentsController($scope, dataService, $routeParams) {
    $scope.dependentsStatus = 'loading';
    var siKey = $routeParams.key;
    var path = '/serviceInstanceDependents/search/findByDependentKey?key=' + siKey;
    var successHandler = function(res) {
      console.log(res);
      $scope.dependents = res.data._embedded.serviceInstanceDependencies;
      $scope.dependentsStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.dependentsStatus = 'error';
    };
    dataService.get(path)
      .then(successHandler, errorHandler);
  }
};
