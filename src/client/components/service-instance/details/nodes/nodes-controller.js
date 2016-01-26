'use strict';

var async = require('async'),
    nodePageToNodeRows = require('../../../util/ng-mappers.js').nodePageToNodeRows;

module.exports = function(app) {
  app.controller('ServiceInstanceNodesController', serviceInstanceNodesController);

  /* @ngInject */  
  function serviceInstanceNodesController($scope, dataService, paginationConfig, $stateParams) {
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
                console.log('ipAddressDetails: ', res);
                node.ipAddresses = res.data._embedded.nodeIpAddresses;
                async.each(node.ipAddresses, function(nIp, cb2) {
                  dataService.get(nIp._links.rotationStatus.href + '?projection=rotationStatusDetails')
                    .then(function(res) {
                      console.log('rotoStatusDets: ', res.data);
                      nIp.ipAggregateRotationStatus = res.data;
                      cb2();
                    });
                }, function(err) {
                  if (err) {
                    cb2(res);
                  } else {
                    cb();
                  }
                });
              });
          }, function(err) {
            if (err) return console.log(err);
            var nodePage = $scope.nodes;
            console.log('sss: ', nodePage);
            $scope.nodeRows = nodePageToNodeRows(nodePage);
            $scope.nodeListStatus = 'loaded';
          });
        };

        dataService.get(requestUrl).then(successHandler, function(err) {
          return console.log(err);
        });
      }
    };

    $scope.model.nodes.pageSelected();
  }
};
