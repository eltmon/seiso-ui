module.exports = function(app) {
  
  app.controller('GlobalsController', globalsController);

  /* @ngInject */
  function globalsController($scope, dataService, AuthService, $http, Page) {
    $scope.Page = Page;
    Page.setTitle('Seiso');
    $scope.AuthService = AuthService;

    AuthService.checkAuthentication();
  }
};
