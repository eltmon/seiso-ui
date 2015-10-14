var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {

  app.controller('StatusListController', StatusListController);
  
  /*@ngInject*/
  function StatusListController($scope, dataService) {
    $scope.model.page.title = pageTitle('Statuses');
    $scope.errors = [];

    dataService.get('/statusTypes')
      .then(function(res) {
          $scope.statusTypes = res.data._embedded.statusTypes;
        }, errorHandler);
  
    dataService.get('/healthStatuses')
      .then(function(res) {
          $scope.healthStatuses = res.data._embedded.healthStatuses;
        }, errorHandler);

    dataService.get('/rotationStatuses')
      .then(function(res) {
          $scope.rotationStatuses = res.data._embedded.rotationStatuses;
        }, errorHandler);

    var errorHandler = function(err) {
      $scope.errors.push(err);
    };
  }
};