var organizeDataCenters = require('../../../ng-mappers').organizeDataCenters;
var pageTitle = require('../../../util').pageTitle;

module.exports = function(app) {
  
  app.controller('DataCenterListController', dataCenterListController);

  dataCenterListController.$inject = ['$scope', 'v2Api', 'generalRegions'];

  function dataCenterListController($scope, v2Api, generalRegions) {
    $scope.listStatus = 'loading';
    $scope.model.page.title = pageTitle('Data Centers');
    
    var path = '/v2/infrastructure-providers';
    var successHandler = function(data) {
      var srcProviders = data._embedded.items;
      var destProviders = organizeDataCenters(srcProviders, generalRegions);
      $scope.generalRegions = generalRegions;
      $scope.infrastructureProviders = destProviders;
      $scope.listStatus = 'loaded';
    };
    var errorHandler = function(data) {
      $scope.listStatus = 'error';
    };
    v2Api.get(path, successHandler, errorHandler);
  }
};
