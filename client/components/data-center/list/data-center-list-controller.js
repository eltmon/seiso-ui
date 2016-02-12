var organizeDataCenters = require('../../util/ng-mappers').organizeDataCenters;
var async = require('async');

module.exports = function(app) {
  
  app.controller('DataCenterListController', dataCenterListController);

  /* @ngInject */
  function dataCenterListController($scope, generalRegions, $http, dataService, Page) {
    $scope.listStatus = 'loading';
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
        $scope.generalRegions = generalRegions;
        $scope.infrastructureProviders = destProviders;
        $scope.listStatus = 'loaded';
      });

    };
    var errorHandler = function(data) {
      $scope.listStatus = 'error';
    };
    dataService.get(path)
      .then(successHandler, errorHandler);
  }
};
