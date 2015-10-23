var nodePageToNodeRows = require('../../../util/ng-mappers.js').nodePageToNodeRows;
var async = require('async');

module.exports = function(app) {
  app.controller('ServiceInstanceNodesController', serviceInstanceNodesController);

  /* @ngInject */  
  function serviceInstanceNodesController($scope, dataService, paginationConfig, $routeParams) {
    $scope.model.nodes = {
      currentPage: 1,
      pageSelected: function() {
        $scope.nodeListStatus = 'loading';
        var pageNumber = $scope.model.nodes.currentPage;
        var apiPageNumber = pageNumber - 1;
        var requestUrl = '/nodes/search/findByServiceInstanceKey?key=' + $routeParams.key
          + '&page=' + apiPageNumber 
          + '&size=' + paginationConfig.itemsPerPage 
          + '&sort=name'
          + '&projection=serviceInstanceNodes';

        var successHandler = function(res) {
          console.log('si nodes ctrl: ', res);
          $scope.metadata = res.data.page;

            async.each(res.data._embedded.nodes, function(node, cb) {
              dataService.get(node._links.self.href + '?projection=serviceInstanceNodes')
                .then(function(res) {
                  console.log(res);
                  cb();
                }, function(res) {
                  cb(res);
                });
            }, function(err) {
              if (res) return console.log(res);
              console.log('done');
            });
          var nodePage = res.data.page;
          
          // $scope.nodeRows = nodePageToNodeRows(nodePage);
          // $scope.nodeListStatus = 'loaded';
        };

        dataService.get(requestUrl).then(successHandler, function(err) {
          return console.log(err);
        });
      }
    };

    $scope.model.nodes.pageSelected();
  }
};
