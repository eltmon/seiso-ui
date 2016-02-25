var organizeDataCenters = require('../../util/ng-mappers').organizeDataCenters;
var async = require('async');

module.exports = function(app) {
  
  app.controller('DataCenterListController', dataCenterListController);

  /* @ngInject */
  function dataCenterListController(generalRegions, $http, dataService, Page) {
    var vm = this;
    vm.listStatus = 'loading';
    Page.setTitle('Data Centers');
    
    var path = '/infrastructureProviders?projection=dataCenters';
    var successHandler = function(res) {

      var srcProviders = res.data._embedded.infrastructureProviders;

      async.each(srcProviders, function(srcProvider, cb) {
        $http.get(srcProvider._links.regions.href)
          .then(function(res) {
            srcProvider.regions = res.data._embedded.regions;
            async.each(srcProvider.regions, function(region, cb2) {
              $http.get(region._links.dataCenters.href)
                .then(function(res) {
                  region.dataCenters = res.data._embedded.dataCenters;
                  cb2();
                }, function(err) {
                  console.log(err);
                });
            }, function(err) {
              if (err) return console.log(err);
              cb();
            });
          }, function(err) {
            console.log(err);
          });
      }, function(err) {
        if (err) return console.log(err);
        var destProviders = organizeDataCenters(srcProviders, generalRegions);
        vm.generalRegions = generalRegions;
        vm.infrastructureProviders = destProviders;
        vm.listStatus = 'loaded';
      });

    };
    var errorHandler = function(data) {
      vm.listStatus = 'error';
    };
    dataService.get(path)
      .then(successHandler, errorHandler);
  }
};
