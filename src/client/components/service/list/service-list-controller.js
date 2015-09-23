// TODO Use generic ListController. Just getting something working at the moment.
module.exports = function(app) {
  app.controller('ServiceListController', ServiceListController);

  /* @ngInject */
  function ServiceListController(DataService, $routeParams, $log) {
    var vm = this;
    $log.info('Creating ServiceListController');
    DataService.findServices().then(function(response) {
      var data = response.data;
      var page = data.page;
      vm.totalItems = page.totalElements;
      vm.services = data._embedded.services;
    }, function(response) {
      $log.error("ERROR");
    });
  }
};
