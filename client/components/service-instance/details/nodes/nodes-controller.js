'use strict';

var async = require('async'),
    nodePageToNodeRows = require('../../../util/ng-mappers.js').nodePageToNodeRows;

module.exports = function(app) {
  app.controller('ServiceInstanceNodesController', serviceInstanceNodesController);

  /* @ngInject */ 
  function serviceInstanceNodesController(dataService, paginationConfig, $stateParams) {
    var vm = this;
    vm.currentPage = 1;
    vm.pageSelected = function() {
      vm.nodeListStatus = 'loading';
      var pageNumber = vm.currentPage;
      var apiPageNumber = pageNumber - 1;
      var requestUrl = '/nodes/search/findByServiceInstanceKey?key=' + $stateParams.key +
          '&page=' + apiPageNumber +
          '&size=' + paginationConfig.itemsPerPage +
          '&sort=name' +
          '&projection=serviceInstanceNodes';

      dataService.get(requestUrl)
        .then(successHandler, errorHandler);

      function successHandler(res) {
        vm.metadata = res.data.page;
        vm.nodes = res.data._embedded.nodes;

        async.each(vm.nodes, function(node, cb) {

          // Get healthStatus, statusType
          if (node.healthStatus !== null) {
            dataService.get(node._links.healthStatus.href)
              .then(function(res) {
                return dataService.get(res.data._links.statusType.href)
              })
              .then(function(res) {
                node.healthStatus.statusType = res.data;
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
          var nodePage = vm.nodes;
          vm.nodeRows = nodePageToNodeRows(nodePage);
          vm.nodeListStatus = 'loaded';
        });
      }

      function errorHandler(err) {
        return console.log(err);
      }
    };

    vm.pageSelected();

  }
};
