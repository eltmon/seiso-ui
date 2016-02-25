module.exports = function(app) {

  app.controller('ServiceInstanceDependentsController', serviceInstanceDependentsController);

  /* @ngInject */
  function serviceInstanceDependentsController(dataService, $stateParams) {
    vm.dependentsStatus = 'loading';
    var siKey = $stateParams.key;
    var path = '/serviceInstances/search/findByName?Name=' + siKey;
    var successHandler = function(res) {
      dataService.get(res.data._links.dependents.href)
        .then(function(res) {
          vm.dependents = res.data._embedded.serviceInstanceDependencies;
          vm.dependentsStatus = 'loaded';
        });

    };
    var errorHandler = function() {
      vm.dependentsStatus = 'error';
    };
    
    dataService.get(path)
      .then(successHandler, errorHandler);
  }
};
