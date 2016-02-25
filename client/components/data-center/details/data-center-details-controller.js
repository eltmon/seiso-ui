var EE = require('events').EventEmitter;
var ee = new EE();
var async = require('async');

module.exports = function(app) {

  app.controller('DataCenterDetailsController', dataCenterDetailsController);

  /* @ngInject */
  function dataCenterDetailsController($http, paginationConfig, $stateParams, dataService, Page) {
    var siUri,
        lbUri,
        vm = this;

    (function getDataCenter() {

      dataService.get('/dataCenters/search/findByKey?key=' + $stateParams.key)
        .then(successHandler, errorHandler);

      function successHandler(res) {
        vm.dataCenter = res.data;
        siUri = res.data._links.serviceInstances.href;
        lbUri = res.data._links.loadBalancers.href;
        Page.setTitle(vm.dataCenter.name);
        ee.emit('dataCenter');
      }

      function errorHandler() { return console.log('Error while getting data center.'); }
      
    })();
    vm.model = {};
    vm.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
          (function getServiceInstances(pageNumber) {
            vm.serviceInstanceListStatus = 'loading';
            var apiPageNumber = pageNumber - 1;

            var reqUrl = '/serviceInstances/search/findByDataCenterKey' +
              '?key=' + vm.dataCenter.key +
              '&page=' + apiPageNumber + 
              '&size=' + paginationConfig.itemsPerPage + 
              '&projection=serviceInstanceDetails' +
              '&sort=key';

            dataService.get(reqUrl)
              .then(successHandler, errorHandler);

            function successHandler(res) {
              var page = res.data;
              vm.serviceInstances = page._embedded.serviceInstances;
              vm.serviceInstanceMetadata = page.metadata;
              vm.serviceInstanceListStatus = 'loaded';
              ee.emit('sis');
              async.each(vm.serviceInstances, function(si, cb) {
                getNodeSummary(si, cb);
              }, function(err) {
                if (err) return console.log(err);
              });
            };

            function errorHandler(res) {
              vm.serviceInstanceListStatus = 'error';
            };


            function getNodeSummary(si, cb) {
              var siHref = si._links.self.href;
              dataService.get(siHref + '/nodeSummary')
                .then(function(res) {
                  si.nodeSummary = res.data;
                  dataService.get(siHref + '/healthBreakdown')
                    .then(function(res) {
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

          })(vm.model.serviceInstances.currentPage);
      }
    };

    vm.model.loadBalancers = {
      currentPage: 1,
      pageSelected: function() {
        (function getLoadBalancers(pageNumber) {
          vm.loadBalancerListStatus = 'loading';
          var apiPageNumber = pageNumber - 1;

          var reqUrl = '/loadBalancers/search/findByDataCenterKey' +
            '?key=' + $stateParams.key +
            '&page=' + apiPageNumber +
            '&size=' + paginationConfig.itemsPerPage +
            '&sort=name';

          dataService.get(reqUrl)
            .then(successHandler, errorHandler);

          function successHandler(res) {
            var page = res.data;
            vm.loadBalancers = page._embedded.loadBalancers;
            vm.loadBalancerMetadata = page.metadata;
            vm.loadBalancerListStatus = 'loaded';
            ee.emit('lbs');
          }

          function errorHandler(res) {
            vm.loadBalancerListStatus = 'error';
          }

        })(vm.model.loadBalancers.currentPage);
      }
    };

    ee.on('dataCenter', function() {
      vm.model.serviceInstances.pageSelected();
      vm.model.loadBalancers.pageSelected();
    });
  }
};
