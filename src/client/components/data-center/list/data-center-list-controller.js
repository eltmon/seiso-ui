var organizeDataCenters = require('../../util/ng-mappers').organizeDataCenters;
var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {
  
  app.controller('DataCenterListController', dataCenterListController);

  dataCenterListController.$inject = ['$scope', 'v3Api', 'generalRegions'];

  function dataCenterListController($scope, v3Api, generalRegions) {
    $scope.listStatus = 'loading';
    $scope.model.page.title = pageTitle('Data Centers');
    
    var path = 'dataCenters';
    var successHandler = function(res) {

      console.log('dataCenters: ', res);
      var srcProviders = res.data._embedded.dataCenters;
      var destProviders = organizeDataCenters(srcProviders, generalRegions);
      $scope.generalRegions = generalRegions;
      $scope.infrastructureProviders = destProviders;
      $scope.listStatus = 'loaded';
    };
    var errorHandler = function(data) {
      $scope.listStatus = 'error';
    };
    v3Api.get(path, successHandler, errorHandler);
  }
};
