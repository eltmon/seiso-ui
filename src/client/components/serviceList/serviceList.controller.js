module.exports = function(app) {
  app.controller('ServiceListController', ServiceListController);

  ServiceListController.$inject = ['DataService', '$routeParams', '$log'];

  function ServiceListController(DataService, $routeParams, $log) {
    var vm = this;
    $log.info('Creating ServiceListController');
    DataService.findServices().then(function(response) {
      vm.services = response.data._embedded.services;
    }, function(response) {
      $log.error("ERROR");
    });
  }
};
