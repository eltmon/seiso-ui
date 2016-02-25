module.exports = function(app) {
  app.controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController($scope, AuthService) {
    $scope.credentials = {};
    $scope.login = AuthService.login;
  }
};
