module.exports = function(app) {

  app.controller('EosDeployController', eosDeployController);

  /* @ngInject */  
  function eosDeployController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.form = {};
    $scope.submit = function() {
      console.log('Deploying');
      $scope.deployStatus = 'loading';
      var requestBody = {
        id: serviceInstanceKey,
        version: $scope.form.version,
        arguments: $scope.form.arguments,
        nodeList: $scope.form.nodeList,
        deploySameVersion: $scope.form.deploySameVersion,
        overrideStateRestriction: $scope.form.overrideStateRestriction,
        skipRotateIn: $scope.form.skipRotateIn,
        skipRotateOut: $scope.form.skipRotateOut,
        skipDvt: $scope.form.skipDvt,
        skipSetActive: $scope.form.skipSetActive
      };
      var path = '/eos/deploy';
      console.log(requestBody);
      $http.post(path, requestBody)
        .the(successHandler, errorHandler);

      function successHandler(data) {
        console.log('Success');
        $scope.deployStatus = 'success';
      }
      function errorHandler() {
        console.log('Error');
        $scope.deployStatus = 'error';
      }

    };
  }
};
