module.exports = function(app) {

  app.controller('EosMaintenanceModeController', eosMaintenanceModeController);

  /* @ngInject */  
  function eosMaintenanceModeController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.form = {};
    $scope.submit = function() {
      console.log('Setting maintenance mode');
      $scope.maintenanceModeStatus = 'loading';
      var requestBody = {
        id: serviceInstanceKey,
        nodeList: $scope.form.nodeList,
        minutes: $scope.form.minutes,
        enable: $scope.form.enable,
        overrideOthers: $scope.form.overrideOthers
      };
      var path = '/eos/maintenanceMode'
      console.log(requestBody);
      $http.post(path, requestBody)
        .then(successHandler, errorHandler);

      function successHandler(data) {
        console.log('Success');
        $scope.maintenanceModeStatus = 'success';
      }

      function errorHandler() {
        console.log('Error');
        $scope.maintenanceModeStatus = 'error';
      }
    };
  }
};
