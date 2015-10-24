module.exports = function(app) {

  app.controller('EosSoakController', eosSoakController);

  /* @ngInject */  
  function eosSoakController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.form = {};
    $scope.submit = function() {
      console.log('Interrogating');
      $scope.soakStatus = 'loading';
      var path = '/internal/service-instances/' + serviceInstanceKey + '/soak';
      var requestBody = {
        'nodeList' : $scope.form.nodeList,
        'activate' : $scope.form.activate
      };
      console.log(requestBody);
      var successHandler = function(data) {
        console.log('Success');
        $scope.soakStatus = 'success';
      };
      var errorHandler = function() {
        console.log('Error');
        $scope.soakStatus = 'error';
      };
      $http.post(path, requestBody)
          .success(successHandler)
          .error(errorHandler);
    };
  }
};
