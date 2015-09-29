var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {

  app.controller('StatusListController', StatusListController);
  
  /*@ngInject*/
  function StatusListController($scope, $http) {
    $scope.model.page.title = pageTitle('Statuses');
    var baseUri = 'http://localhost:8080';
    // TODO Handle errors
    $http.get(baseUri + '/statusTypes')
        .then(function(res) {
        console.log(res); 
          $scope.statusTypes = res.data._embedded.statusTypes;
        });
    $http.get(baseUri + '/healthStatuses')
        .then(function(res) {
          console.log(res);
          $scope.healthStatuses = res.data._embedded.healthStatuses;
        });
    $http.get(baseUri + '/rotationStatuses')
        .then(function(res) {
          console.log(res);
          $scope.rotationStatuses = res.data._embedded.rotationStatuses;
        });
  }
};