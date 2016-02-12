
module.exports = function(app) {

  app.controller('StatusListController', StatusListController);
  
  /*@ngInject*/
  function StatusListController($scope, dataService, Page) {
    Page.setTitle('Statuses');
    $scope.errors = [];

    dataService.get('/statusTypes')
      .then(function(res) {
        console.log(res);
          $scope.statusTypes = res.data._embedded.statusTypes;
        }, errorHandler);
  
    dataService.get('/healthStatuses?projection=healthStatusDetails')
      .then(function(res) {
        console.log(res);
          $scope.healthStatuses = res.data._embedded.healthStatuses;
        }, errorHandler);

    dataService.get('/rotationStatuses?projection=rotationStatusDetails')
      .then(function(res) {
          $scope.rotationStatuses = res.data._embedded.rotationStatuses;
        }, errorHandler);

    var errorHandler = function(err) {
      $scope.errors.push(err);
    };
  }
};