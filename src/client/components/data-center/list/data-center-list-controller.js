var organizeDataCenters = require('../../util/ng-mappers').organizeDataCenters;
var pageTitle = require('../../util/util').pageTitle;
var async = require('async');

module.exports = function(app) {
  
  app.controller('DataCenterListController', dataCenterListController);

  dataCenterListController.$inject = ['$scope', '$http', 'generalRegions', '$http'];

  function dataCenterListController($scope, $http, generalRegions, $http) {
    $scope.listStatus = 'loading';
    $scope.model.page.title = pageTitle('Data Centers');
    
    var path = 'http://localhost:8080/infrastructureProviders?projection=dataCenters';
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
    $http.get(path)
      .then(successHandler, errorHandler);
  }
};
