var pageTitle = require('../../util/util').pageTitle;
var EE = require('events').EventEmitter;
var ee = new EE();

module.exports = function(app) {

  app.controller('DataCenterDetailsController', dataCenterDetailsController);

  /* @ngInject */
  function dataCenterDetailsController($scope, $http, paginationConfig, $routeParams, DataService) {
    var siUri;
    var lbUri;

    console.log($routeParams.key);
    (function getDataCenter() {
      var successHandler = function(res) {
        console.log('success: ', res);
        var dataCenter = res.data;
        $scope.dataCenter = dataCenter;
        siUri = res.data._links.serviceInstances.href;
        lbUri = res.data._links.loadBalancers.href;
        ee.emit('dataCenter');        
        $scope.model.page.title = pageTitle(dataCenter.name);
      };
      var errorHandler = function() { console.log('Error while getting data center.'); };
      var DataCenter = new DataService('/dataCenters/search/findByKey?key=' + $routeParams.key);
      DataCenter.get(function(err, res) {
        if (err) return console.log(err);
        successHandler(res);
      });
    })();

    $scope.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
          console.log('datacenter si emit:');
          (function getServiceInstances(pageNumber) {
            $scope.serviceInstanceListStatus = 'loading';
            var apiPageNumber = pageNumber - 1;
            // FIXME
            var reqUrl = '/serviceInstances/search/findByDataCenterWithCounts?key=' + $scope.dataCenter.key;
              var pageQuery = '&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=key';
            var DataCenterSIs = new DataService(reqUrl);

            var successHandler = function(data) {
              var page = data;
              $scope.serviceInstances = page._embedded.items;
              $scope.serviceInstanceMetadata = page.metadata;
              $scope.serviceInstanceListStatus = 'loaded';
              ee.emit('sis');
            };
            DataCenterSIs.get(function(err, res) {
              if (err) return console.log(err);
              successHandler(res);
            });
          })($scope.model.serviceInstances.currentPage);
      }
    };

    $scope.model.loadBalancers = {
      currentPage: 1,
      pageSelected: function() {
        (function getLoadBalancers(pageNumber) {
          $scope.loadBalancerListStatus = 'loading';
          var apiPageNumber = pageNumber - 1;
          var reqUrl = '/loadBalancers/search/findByDataCenterKey?key=' + $routeParams.key + 
            '&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=name';
          var LoadBalancers = new DataService(reqUrl);
          var successHandler = function(data) {
            var page = data;
            $scope.loadBalancers = page._embedded.items;
            $scope.loadBalancerMetadata = page.metadata;
            $scope.loadBalancerListStatus = 'loaded';
            ee.emit('lbs');
          };
          LoadBalancers.get(function(err, res) {
            if (err) return console.log(err);
            successHandler(res);
          });
        })($scope.model.loadBalancers.currentPage);
      }
    };
    ee.on('dataCenter', function() {
      $scope.model.serviceInstances.pageSelected();
      $scope.model.loadBalancers.pageSelected();
    });
  }
};
