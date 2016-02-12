module.exports = function(app) {

  app.controller('EosReloadController', eosReloadController);

  /* @ngInject */
  function eosReloadController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.submit = function() {
      console.log('Reloading');
      $scope.reloadStatus = 'loading';
      var path = '/internal/service-instances/' + serviceInstanceKey + '/reload';
      var successHandler = function(data) {
        console.log('Success');
        $scope.reloadStatus = 'success';
      };
      var errorHandler = function() {
        console.log('Error');
        $scope.reloadStatus = 'error';
      };
      $http.post(path)
          .success(successHandler)
          .error(errorHandler);
    };
  }
};
