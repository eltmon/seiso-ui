var pageTitle = require('../../util/util').pageTitle;
var EE = require('events').EventEmitter;
var ee = new EE();

module.exports = function(app) {
  
  app.controller('DataCenterDetailsController', dataCenterDetailsController);

  dataCenterDetailsController.$inject = ['$scope', 'v2Api', '$http', 'paginationConfig', '$routeParams'];

  function dataCenterDetailsController($scope, v2Api, $http, paginationConfig, $routeParams) {
    var siUri;
    var lbUri;

    console.log($routeParams.key);
    (function getDataCenter() {
      var successHandler = function(data) {
        console.log('success: ', data);
        var dataCenter = data;
        $scope.dataCenter = dataCenter;
        siUri = data._links.serviceInstances.href;
        lbUri = data._links.loadBalancers.href;

        $http.get(siUri)
          .then(function(res) {
            $scope.serviceInstances = res.data._embedded.serviceInstances;
            $http.get(lbUri)
              .then(function(res) {
                $scope.loadBalancers = res.data._embedded.loadBalancers;
              }, function(err) {
                console.log(err);
              });
          }, function(err) {
            console.log(err);
          });
        
        
        $scope.model.page.title = pageTitle(dataCenter.name);
        console.log(dataCenter);
        ee.emit('dataCenter');
      };
      var errorHandler = function() { console.log('Error while getting data center.'); };
      v2Api.get('http://localhost:8080/dataCenters/search/findByKey?key=' + $routeParams.key, successHandler, errorHandler);
    })();
    

    $scope.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
        (function getServiceInstances(pageNumber) {
          $scope.serviceInstanceListStatus = 'loading';
          var apiPageNumber = pageNumber - 1;
          var reqUrl = 'http://localhost:8080/serviceInstances/search/findByDataCenter?' + 
            '&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=key';
          var siRequest = {
              method: 'GET',
              url: reqUrl,
              headers: { 'Accept': 'application/hal+json' }
          };
          var successHandler = function(data) {
            console.log('si data: ', data);
            var page = data;
            $scope.serviceInstances = page._embedded.items;
            $scope.serviceInstanceMetadata = page.metadata;
            $scope.serviceInstanceListStatus = 'loaded';
            ee.emit('sis');
          };
          $http(siRequest)
              .success(successHandler)
              .error(function() { $scope.serviceInstanceListStatus = 'error'; });
        })($scope.model.serviceInstances.currentPage);
      }
    };

    $scope.model.loadBalancers = {
      currentPage: 1,
      pageSelected: function() {
        (function getLoadBalancers(pageNumber) {
          $scope.loadBalancerListStatus = 'loading';
          var apiPageNumber = pageNumber - 1;
          var reqUrl = 'http://localhost:8080/loadBalancers/search/findByDataCenterKey?key=' + $routeParams.key + 
            '&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=name';
          var request = {
              method: 'GET',
              url: reqUrl,
              headers: { 'Accept': 'application/hal+json' }
          };
          var successHandler = function(data) {
            console.log('lb data: ', data);
            var page = data;
            $scope.loadBalancers = page._embedded.items;
            $scope.loadBalancerMetadata = page.metadata;
            $scope.loadBalancerListStatus = 'loaded';
            ee.emit('lbs');
          };
          $http(request)
              .success(successHandler)
              .error(function() { $scope.loadBalancerListStatus = 'error'; });
        })($scope.model.loadBalancers.currentPage);
      }
    };
    ee.on('dataCenter', function() {
      $scope.model.serviceInstances.pageSelected();
      $scope.model.loadBalancers.pageSelected();
    });
  }
};
