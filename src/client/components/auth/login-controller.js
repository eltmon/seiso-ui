module.exports = function(app) {
  app.controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController($scope, authService) {
    $scope.credentials = {};
    $scope.login = authService.login;
  }
};
