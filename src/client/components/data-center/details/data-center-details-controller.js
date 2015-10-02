var pageTitle = require('../../util/util').pageTitle;
var EE = require('events').EventEmitter;
var ee = new EE();

module.exports = function(app) {

  app.controller('DataCenterDetailsController', dataCenterDetailsController);

  dataCenterDetailsController.$inject = ['$scope', '$http', 'paginationConfig', '$routeParams'];

  function dataCenterDetailsController($scope, $http, paginationConfig, $routeParams) {
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
        // $http.get(siUri)
        //   .then(function(res) {
        //     console.log('sis:', res);
        //     $scope.serviceInstances = res.data._embedded.serviceInstances;
        //     $http.get(lbUri)
        //       .then(function(res) {
        //         console.log('lbs:', res);
        //         $scope.loadBalancers = res.data._embedded.loadBalancers;
        //       }, function(err) {
        //         console.log(err);
        //       });
        //   }, function(err) {
        //     console.log(err);
        //   });
        
        $scope.model.page.title = pageTitle(dataCenter.name);
      };
      var errorHandler = function() { console.log('Error while getting data center.'); };
      $http.get('http://localhost:8080/dataCenters/search/findByKey?key=' + $routeParams.key)
        .then(successHandler, errorHandler);
    })();

    $scope.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
          console.log('datacenter si emit:');
          (function getServiceInstances(pageNumber) {
            $scope.serviceInstanceListStatus = 'loading';
            var apiPageNumber = pageNumber - 1;
            var reqUrl = 'http://localhost:8080/serviceInstances/search/findByDataCenterWithCounts?key=' + $scope.dataCenter.key;
              var pageQuery = '&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=key';
              console.log('reqUrl: ', reqUrl);
            var siRequest = {
                method: 'GET',
                url: reqUrl
                // headers: { 'Accept': 'application/hal+json' }
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
                .then(successHandler, function() { $scope.serviceInstanceListStatus = 'error'; });

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
