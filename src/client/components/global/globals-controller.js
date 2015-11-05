module.exports = function(app) {
  
  app.controller('GlobalsController', globalsController);

  /* @ngInject */
  function globalsController($rootScope, $scope, dataService, AuthService) {
    $scope.logout = AuthService.logout;
    
    AuthService.checkAuthentication(false);
    
    var getGlobalData = function() {
      var successHandler = function(data) {
        $rootScope.globals = {
          nav: data.seisoNav,
          motd: data.motd,
          enableActions: data.enableActions
        };
      };
      var errorHandler = function() {
        $rootScope.globals = {
          globalsError: true
        };
      };
      //TODO: Conform to new routes when created on API.
      dataService.get('/internals/global')
        .then(successHandler, errorHandler);
    };
    getGlobalData();
  }
};
