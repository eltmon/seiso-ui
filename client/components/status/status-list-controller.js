
module.exports = function(app) {

  app.controller('StatusListController', StatusListController);
  
  /* @ngInject */
  function StatusListController(dataService, Page) {
    var vm = this;
    Page.setTitle('Statuses');
    vm.errors = [];

    dataService.get('/statusTypes')
      .then(function(res) {
        console.log(res);
          vm.statusTypes = res.data._embedded.statusTypes;
        }, errorHandler);
  
    dataService.get('/healthStatuses?projection=healthStatusDetails')
      .then(function(res) {
          console.log(res);
          vm.healthStatuses = res.data._embedded.healthStatuses;
        }, errorHandler);

    dataService.get('/rotationStatuses?projection=rotationStatusDetails')
      .then(function(res) {
          vm.rotationStatuses = res.data._embedded.rotationStatuses;
        }, errorHandler);

    var errorHandler = function(err) {
      vm.errors.push(err);
    };
  }
};