module.exports = function(app) {

  app.controller('EosSetActiveController', eosSetActiveController);

  /* @ngInject */
  function eosSetActiveController($scope, $http, $stateParams) {
    var serviceInstanceKey = $stateParams.key;
    $scope.submit = function() {
      console.log('Setting active');
      $scope.setActiveStatus = 'loading';
      
      $http.post('/eos/setActive', {id: serviceInstanceKey})
        .then(successHandler, errorHandler);

      function successHandler(data) {
        console.log('Success');
        $scope.setActiveStatus = 'success';
      }

      function errorHandler() {
        console.log('Error');
        $scope.setActiveStatus = 'error';
      }
    };
  }
};
