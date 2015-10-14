module.exports = function(app) {
  app.controller('EnvironmentListController', EnvironmentListController);

  /* @ngInject */
  function EnvironmentListController(dataService, $log) {
    var vm = this;
    dataService.get('/environments').then(success, error);

    function success(response)  {
      vm.listStatus = 'loaded';
      vm.items = response.data._embedded.environments;
    }

    function error(response) {
      $log.error(response);
      vm.listStatus = 'error';
    }
  }
};
