module.exports = function(app) {

  app.controller('ServiceInstanceDependenciesController', serviceInstanceDependenciesController);

  /* @ngInject */
  function serviceInstanceDependenciesController(dataService, $stateParams) {
    vm.dependenciesStatus = 'loading';
    var siKey = $stateParams.key;
    var path = '/serviceInstances/search/findByName?name=' + siKey;
    var successHandler = function(res) {
      dataService.get(res.data._links.dependencies.href)
        .then(function(res) {
          vm.dependencies = res.data._embedded.serviceInstanceDependencies;
          vm.dependenciesStatus = 'loaded';
        });
      
    };
    var errorHandler = function() {
      vm.dependenciesStatus = 'error';
    };
    dataService.get(path)
      .then(successHandler, errorHandler);
  }
};
