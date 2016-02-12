module.exports = function(app) {

  app.controller('EosSetActiveController', eosSetActiveController);

  /* @ngInject */
  function eosSetActiveController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.submit = function() {
      console.log('Setting active');
      $scope.setActiveStatus = 'loading';
      var path = '/internal/service-instances/' + serviceInstanceKey + '/set-active';
      var successHandler = function(data) {
        console.log('Success');
        $scope.setActiveStatus = 'success';
      };
      var errorHandler = function() {
        console.log('Error');
        $scope.setActiveStatus = 'error';
      };
      $http.post(path)
          .success(successHandler)
          .error(errorHandler);
    };
  }
};
