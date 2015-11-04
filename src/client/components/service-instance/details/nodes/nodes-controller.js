var nodePageToNodeRows = require('../../../util/ng-mappers.js').nodePageToNodeRows;
var async = require('async');

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
        var requestUrl = '/nodes/search/findByServiceInstanceKey?key=' + $stateParams.key
          + '&page=' + apiPageNumber 
          + '&size=' + paginationConfig.itemsPerPage 
          + '&sort=name'
          + '&projection=serviceInstanceNodes';

        var successHandler = function(res) {
          console.log('nodes pane: ', res);

          $scope.metadata = res.data.page;
          $scope.nodes = res.data._embedded.nodes;

          async.each($scope.nodes, function(node, cb) {
            dataService.get(node._links.ipAddresses.href + '?projection=ipAddressDetails')
              .then(function(res) {
                node.ipAddresses = res.data._embedded.nodeIpAddresses;
                cb();
              }, function(res) {
                cb(res);
              });
          }, function(err) {
            if (err) return console.log(err);
            var nodePage = $scope.nodes;
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
