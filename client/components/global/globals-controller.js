module.exports = function(app) {
  
  app.controller('GlobalsController', globalsController);

  /* @ngInject */
  function globalsController($rootScope, $scope, dataService, AuthService, $http, Page) {
    $scope.Page = Page;
    Page.setTitle('Seiso');
    $scope.logout = AuthService.logout;
    
    // TODO: Set up Authentication here

    // AuthService.checkAuthentication(false);
  }
};
