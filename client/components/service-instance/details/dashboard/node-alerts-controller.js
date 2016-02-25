var nodePageToNodeRows = require('../../../util/ng-mappers').nodePageToNodeRows;

module.exports = function(app) {

  app.controller('NodeAlertsController', nodeAlertsController);

  /* @ngInject */
  function nodeAlertsController(dataService, paginationConfig, $stateParams) {
    var vm = this;
    vm.nodeAlerts = {
      currentPage: 1,
      pageSelected: function() {
        vm.nodeAlertsStatus = 'loading';
        var pageNumber = vm.nodeAlerts.currentPage;
        var apiPageNumber = pageNumber - 1;
        var path = '/nodes/search/findNodeAlertsByServiceInstance?key=' + $stateParams.key + 
            '&view=serviceInstanceNodes' + 
            '&page=' + apiPageNumber + 
            '&size=' + paginationConfig.itemsPerPage + 
            '&sort=name';

        var successHandler = function(res) {
          vm.nodeAlertsPage = res.data._embedded;
          vm.metadata = vm.nodeAlertsPage.metadata;
          vm.nodeRows = nodePageToNodeRows(vm.nodeAlertsPage);
          vm.nodeAlerts = vm.nodeAlertsPage.nodes;
          vm.nodeAlertsStatus = 'loaded';
        };
        
        var errorHandler = function() { vm.nodeAlertsStatus = 'error'; };

        dataService.get(path)
          .then(successHandler, errorHandler);
      }
    };
    vm.nodeAlerts.pageSelected();
  }
};
