var pageTitle = require('../../util/util').pageTitle;
var EE = require('events').EventEmitter;
var ee = new EE();

module.exports = function(app) {

  app.controller('DataCenterDetailsController', dataCenterDetailsController);

  /* @ngInject */
  function dataCenterDetailsController($scope, $http, paginationConfig, $routeParams, dataService) {
    var siUri;
    var lbUri;

    console.log($routeParams.key);
    (function getDataCenter() {
      var successHandler = function(res) {
        var dataCenter = res.data;
        $scope.dataCenter = dataCenter;
        siUri = res.data._links.serviceInstances.href;
        lbUri = res.data._links.loadBalancers.href;
        ee.emit('dataCenter');        
        $scope.model.page.title = pageTitle(dataCenter.name);
      };
      var errorHandler = function() { console.log('Error while getting data center.'); };
      dataService.get('/dataCenters/search/findByKey?key=' + $routeParams.key)
        .then(successHandler, errorHandler);
    })();

    $scope.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
          (function getServiceInstances(pageNumber) {
            $scope.serviceInstanceListStatus = 'loading';
            var apiPageNumber = pageNumber - 1;
            // FIXME
            var reqUrl = '/serviceInstances/search/findByDataCenterWithCounts?key=' + $scope.dataCenter.key;
            var pageQuery = '&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=key';

            var successHandler = function(res) {
              var page = res.data;
              $scope.serviceInstances = page._embedded.serviceInstances;
              $scope.serviceInstanceMetadata = page.metadata;
              $scope.serviceInstanceListStatus = 'loaded';
              ee.emit('sis');
            };

            var errorHandler = function(res) {
              $scope.serviceInstanceListStatus = 'error';
            };
            dataService.get(reqUrl + pageQuery)
              .then(successHandler, errorHandler);

          })($scope.model.serviceInstances.currentPage);
      }
    };

    $scope.model.loadBalancers = {
      currentPage: 1,
      pageSelected: function() {
        (function getLoadBalancers(pageNumber) {
          $scope.loadBalancerListStatus = 'loading';
          var apiPageNumber = pageNumber - 1;
          var reqUrl = '/loadBalancers/search/findByDataCenterKey?key=' + $routeParams.key 
            + '&page=' + apiPageNumber 
            + '&size=' + paginationConfig.itemsPerPage 
            + '&sort=name';
          var successHandler = function(res) {
            var page = res.data;
            $scope.loadBalancers = page._embedded.loadBalancers;
            $scope.loadBalancerMetadata = page.metadata;
            $scope.loadBalancerListStatus = 'loaded';
            ee.emit('lbs');
          };
          var errorHandler = function(res) {
            $scope.loadBalancerListStatus = 'error';
          };
          dataService.get(reqUrl)
            .then(successHandler, errorHandler);

        })($scope.model.loadBalancers.currentPage);
      }
    };
    ee.on('dataCenter', function() {
      $scope.model.serviceInstances.pageSelected();
      $scope.model.loadBalancers.pageSelected();
    });
  }
};
