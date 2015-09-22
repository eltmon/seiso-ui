module.exports = function(app) {
  app.controller('ServiceListController', ServiceListController);

  ServiceListController.$inject = ['v2Api', '$routeParams', '$log'];

  function ServiceListController(v2Api, $routeParams, $log) {
    var vm = this;
    $log.info('Creating ServiceListController');
  }
};
