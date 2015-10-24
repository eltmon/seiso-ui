var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {

  app.controller('MachineDetailsController', machineDetailsController);

  /* @ngInject */
  function machineDetailsController($scope, $http, $stateParams) {
    $http.get('/v1/machines/' + $stateParams.name)
        .success(function(data) {
          $scope.model.page.title = pageTitle(data.name);
          $scope.machine = data;
          $scope.nodes = data.nodes;
        })
        .error(function() { console.log('Error while getting machine.'); });
  }
};