var nodePageToNodeRows = require('../../../util/ng-mappers').nodePageToNodeRows;

module.exports = function(app) {

  app.controller('NodeAlertsController', nodeAlertsController);

  /* @ngInject */
  function nodeAlertsController(dataService, paginationConfig, $stateParams) {
    var vm = this;
    vm.currentPage = 1;
    vm.pageSelected = function() {
      vm.nodeAlertsStatus = 'loading';
      var pageNumber = vm.currentPage;
      var apiPageNumber = pageNumber - 1;
      var path = '/nodes/search/findNodeAlertsByServiceInstance?key=' + $stateParams.key + 
          '&view=serviceInstanceNodes' + 
          '&page=' + apiPageNumber + 
          '&size=' + paginationConfig.itemsPerPage + 
          '&sort=name';

      dataService.get(path)
        .then(successHandler, errorHandler);

      function successHandler(res) {
        vm.nodeAlertsPage = res.data._embedded;
        vm.metadata = vm.nodeAlertsPage.metadata;
        vm.nodeRows = nodePageToNodeRows(vm.nodeAlertsPage);
        vm.nodeAlerts = vm.nodeAlertsPage.nodes;
        vm.nodeAlertsStatus = 'loaded';
      }
      
      function errorHandler() { vm.nodeAlertsStatus = 'error'; }
    }

    vm.pageSelected();
  }
};
