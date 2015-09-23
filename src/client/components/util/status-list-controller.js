var pageTitle = require('./util').pageTitle;

module.exports = function(app) {

  app.controller('statusListController', statusListController);

  statusListController.$inject = ['$scope', '$http'];
  
  function statusListController($scope, $http) {
    $scope.model.page.title = pageTitle('Statuses');
    
    // TODO Handle errors
    $http.get('/v1/status-types')
        .success(function(data) { $scope.statusTypes = data; });
    $http.get('/v1/health-statuses')
        .success(function(data) { $scope.healthStatuses = data; });
    $http.get('/v1/rotation-statuses')
        .success(function(data) { $scope.rotationStatuses = data; });
  }
};