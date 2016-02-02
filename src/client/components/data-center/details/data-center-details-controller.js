var pageTitle = require('../../util/util').pageTitle;
var EE = require('events').EventEmitter;
var ee = new EE();
var async = require('async');

module.exports = function(app) {

  app.controller('DataCenterDetailsController', dataCenterDetailsController);

  /* @ngInject */
  function dataCenterDetailsController($scope, $http, paginationConfig, $stateParams, dataService) {
    var siUri;
    var lbUri;

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
      dataService.get('/dataCenters/search/findByKey?key=' + $stateParams.key)
        .then(successHandler, errorHandler);
    })();

    $scope.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
          (function getServiceInstances(pageNumber) {
            $scope.serviceInstanceListStatus = 'loading';
            var apiPageNumber = pageNumber - 1;
            // FIXME
            var reqUrl = '/serviceInstances/search/findByDataCenterKey?key=' + $scope.dataCenter.key;
            var pageQuery = '&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=key' + '&projection=serviceInstanceDetails';

            var successHandler = function(res) {
              console.log('serviceInstances: ', res.data);
              var page = res.data;
              $scope.serviceInstances = page._embedded.serviceInstances;
              $scope.serviceInstanceMetadata = page.metadata;
              $scope.serviceInstanceListStatus = 'loaded';
              ee.emit('sis');
              async.each($scope.serviceInstances, function(si, cb) {
                getNodeSummary(si, cb);
              }, function(err) {
                if (err) return console.log(err);
              });
            };

            var errorHandler = function(res) {
              $scope.serviceInstanceListStatus = 'error';
            };
            dataService.get(reqUrl + pageQuery)
              .then(successHandler, errorHandler);

            function getNodeSummary(si, cb) {
              var siHref = si._links.self.href;
              dataService.get(siHref + '/nodeSummary')
                .then(function(res) {
                  si.nodeSummary = res.data;
                  dataService.get(siHref + '/healthBreakdown')
                    .then(function(res) {
                      console.log('healthBreakdown: ', res.data);
                      si.healthBreakdown = res.data;

                      // Handle the case where a service instance has no nodes.
                      if (res.data._embedded ===  undefined) {
                        si.healthKey = 'warning';
                      } else {
                        si.healthKey = res.data._embedded.breakdownItems[0].statusType;
                      }
                      cb();
                    });
                });
            }

          })($scope.model.serviceInstances.currentPage);
      }
    };

    $scope.model.loadBalancers = {
      currentPage: 1,
      pageSelected: function() {
        (function getLoadBalancers(pageNumber) {
          $scope.loadBalancerListStatus = 'loading';
          var apiPageNumber = pageNumber - 1;

          var reqUrl = '/loadBalancers/search/findByDataCenterKey?key=' + $stateParams.key +
              '&page=' + apiPageNumber +
              '&size=' + paginationConfig.itemsPerPage +
              '&sort=name';

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
