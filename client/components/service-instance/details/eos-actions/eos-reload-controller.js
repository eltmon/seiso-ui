module.exports = function(app) {

  app.controller('EosReloadController', eosReloadController);

  /* @ngInject */
  function eosReloadController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.submit = function() {
      console.log('Reloading');
      $scope.reloadStatus = 'loading';
      
      $http.post('/eos/reload', {id: serviceInstanceKey})
        .success(successHandler, errorHandler);

      function successHandler(data) {
        console.log('Success');
        $scope.reloadStatus = 'success';
      }

      function successHandler() {
        console.log('Error');
        $scope.reloadStatus = 'error';
      }
    };
  }
};
