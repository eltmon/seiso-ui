module.exports = function(app) {

  app.controller('EosSoakController', eosSoakController);

  /* @ngInject */  
  function eosSoakController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.form = {};
    $scope.submit = function() {
      console.log('Interrogating');
      $scope.soakStatus = 'loading';

      var path = '/eos/soak';
      var requestBody = {
        id: serviceInstanceKey,
        nodeList: $scope.form.nodeList,
        activate: $scope.form.activate
      };
      
      console.log(requestBody);

      $http.post(path, requestBody)
          .then(successHandler, errorHandler);

      function successHandler(data) {
        console.log('Success');
        $scope.soakStatus = 'success';
      }

      function errorHandler() {
        console.log('Error');
        $scope.soakStatus = 'error';
      }
    };
  }
};
