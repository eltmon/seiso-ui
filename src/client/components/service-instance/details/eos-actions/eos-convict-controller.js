module.exports = function(app) {

  app.controller('EosConvictController', eosConvictController);

  /* @ngInject */
  function eosConvictController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.form = {};
    $scope.submit = function() {
      console.log('Interrogating');
      $scope.convictStatus = 'loading';
      var path = '/internal/service-instances/' + serviceInstanceKey + '/convict';
      var requestBody = {
        'nodeList' : $scope.form.nodeList,
        'reason' : $scope.form.reason,
        'overrideCapacity' : $scope.form.overrideCapacity,
        'skipRotateIn' : $scope.form.skipRotateIn
      };
      console.log(requestBody);
      var successHandler = function(data) {
        console.log('Success');
        $scope.convictStatus = 'success';
      };
      var errorHandler = function() {
        console.log('Error');
        $scope.convictStatus = 'error';
      };
      $http.post(path, requestBody)
          .success(successHandler)
          .error(errorHandler);
    };
  }
};
