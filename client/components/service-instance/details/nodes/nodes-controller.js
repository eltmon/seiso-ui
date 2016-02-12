'use strict';

var async = require('async'),
    nodePageToNodeRows = require('../../../util/ng-mappers.js').nodePageToNodeRows;

module.exports = function(app) {
  app.controller('ServiceInstanceNodesController', serviceInstanceNodesController);

  /* @ngInject */  
  function serviceInstanceNodesController($scope, dataService, paginationConfig, $stateParams) {
    $scope.model = {};
    $scope.model.nodes = {
      currentPage: 1,
      pageSelected: function() {
        $scope.nodeListStatus = 'loading';
        var pageNumber = $scope.model.nodes.currentPage;
        var apiPageNumber = pageNumber - 1;
        var requestUrl = '/nodes/search/findByServiceInstanceKey?key=' + $stateParams.key +
            '&page=' + apiPageNumber +
            '&size=' + paginationConfig.itemsPerPage +
            '&sort=name' +
            '&projection=serviceInstanceNodes';

        var successHandler = function(res) {
          $scope.metadata = res.data.page;
          $scope.nodes = res.data._embedded.nodes;

          async.each($scope.nodes, function(node, cb) {
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
            var nodePage = $scope.nodes;
            $scope.nodeRows = nodePageToNodeRows(nodePage);
            $scope.nodeListStatus = 'loaded';
          });
        };

        var errorHandler = function(err) {
          return console.log(err);
        };

        dataService.get(requestUrl)
          .then(successHandler, errorHandler);
      }
    };

    $scope.model.nodes.pageSelected();
  }
};