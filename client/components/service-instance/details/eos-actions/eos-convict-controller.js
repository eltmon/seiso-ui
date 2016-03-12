
module.exports = eosConvictController;

/* @ngInject */
function eosConvictController($scope, $http, $stateParams) {
  var serviceInstanceKey = $stateParams.key;
  $scope.form = {};
  $scope.submit = function() {
    console.log('Interrogating');
    $scope.convictStatus = 'loading';
    var requestBody = {
      id: serviceInstanceKey,
      nodeList: $scope.form.nodeList,
      reason: $scope.form.reason,
      overrideCapacity: $scope.form.overrideCapacity,
      skipRotateIn: $scope.form.skipRotateIn
    };
    var path = '/eos/convict';
    console.log(requestBody);
    
    $http.post(path, requestBody)
      .then(successHandler, errorHandler);

    function successHandler(data) {
      console.log('Success');
      $scope.convictStatus = 'success';
    }

    function errorHandler() {
      console.log('Error');
      $scope.convictStatus = 'error';
    }
  };
}

