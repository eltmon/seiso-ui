var nodePageToNodeRows = require('../../../util/ng-mappers').nodePageToNodeRows;

module.exports = function(app) {

  app.controller('NodeAlertsController', nodeAlertsController);

  /* @ngInject */
  function nodeAlertsController(dataService, paginationConfig, $stateParams) {
    var vm = this;
    vm.nodeAlerts = [];
    vm.currentPage = 1;
    vm.pageSelected = function() {
      vm.nodeAlertsStatus = 'loading';
      var pageNumber = vm.currentPage;
      var apiPageNumber = pageNumber - 1;
      var path = '/nodes/search/findNodeAlertsByServiceInstance?key=' + $stateParams.key + 
          '&projection=nodeDetails' + 
          '&page=' + apiPageNumber + 
          '&size=' + paginationConfig.itemsPerPage + 
          '&sort=name';

      dataService.get(path)
        .then(successHandler, errorHandler);

      function successHandler(res) {
        vm.nodeAlertsPage = res.data._embedded.nodes;
        vm.metadata = vm.nodeAlertsPage.page;

        if (vm.nodeAlertsPage.length > 0) {
          async.each(vm.nodeAlertsPage, function(node, cb) {

            // Get healthStatus, statusType
            if (node.healthStatus !== null) {
              dataService.get(node._links.healthStatus.href + '?projection=healthStatusDetails')
                .then(function(res) {
                  node.healthStatus = res.data;
                });
            }

            dataService.get(node._links.ipAddresses.href + '?projection=ipAddressDetails')
              .then(function(res) {
                node.ipAddresses = res.data._embedded.nodeIpAddresses;
                async.each(node.ipAddresses, function(nIp, cb2) {
                  dataService.get(nIp._links.aggregateRotationStatus.href + '?projection=rotationStatusDetails')
                    .then(function(res) {
                      nIp.aggregateRotationStatus = res.data;
                      cb2();
                    });
                }, function(err) {
                  if (err) {
                    cb(err);
                  } else {
                    cb();
                  }
                });
              });
          }, function(err) {
            if (err) return console.log(err);
            vm.nodeRows = nodePageToNodeRows(vm.nodeAlertsPage);
            vm.nodeAlerts = vm.nodeAlertsPage;
            vm.nodeAlertsStatus = 'loaded';
          });          
        } else {
          vm.nodeAlertsStatus = 'loaded';
        }
      }
      
      function errorHandler() { vm.nodeAlertsStatus = 'error'; }
    }

    vm.pageSelected();
  }
};
