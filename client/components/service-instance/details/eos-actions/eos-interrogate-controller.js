module.exports = eosInterrogateController;

/* @ngInject */  
function eosInterrogateController($scope, $http, $stateParams) {
  var serviceInstanceKey = $stateParams.key;
  $scope.form = {};
  $scope.submit = function() {
    console.log('Interrogating');
    $scope.interrogateStatus = 'loading';
    var requestBody = {
      id: serviceInstanceKey,
      nodeList: $scope.form.nodeList,
      runDvt: $scope.form.runDvt
    };
    var path = '/eos/interrogate';
    console.log(requestBody);
    $http.post(path, requestBody)
      .then(successHandler, errorHandler);

    function successHandler(data) {
      console.log('Success');
      $scope.interrogateStatus = 'success';
    }

    function errorHandler() {
      console.log('Error');
      $scope.interrogateStatus = 'error';
    }
  };
}
