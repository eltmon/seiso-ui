
var listController = require('../../util/list-controller');

module.exports = function(app) {
  app.controller('EnvironmentListController', EnvironmentListController);

  /*@ngInject*/
  function EnvironmentListController($scope, $http) {
    $http.get('http://localhost:8080/environments')
      .then(function(res) {
        $scope.listStatus = 'loaded';
        $scope.items = res.data._embedded.environments;
      }, function(err) {
        $scope.listStatus = 'error';
        console.log(err);
      });
  }
};