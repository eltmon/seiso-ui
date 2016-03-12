
module.exports = eosReloadController;

/* @ngInject */
function eosReloadController($scope, $http, $stateParams) {
  var serviceInstanceKey = $stateParams.key;
  $scope.submit = function() {
    console.log('Reloading');
    $scope.reloadStatus = 'loading';
    
    $http.post('/eos/reload', {id: serviceInstanceKey})
      .then(successHandler, errorHandler);

    function successHandler(data) {
      console.log('Success');
      $scope.reloadStatus = 'success';
    }

    function errorHandler() {
      console.log('Error');
      $scope.reloadStatus = 'error';
    }
  };
}
