module.exports = function(app) {
  
  app.controller('GlobalsController', globalsController);

  globalsController.$inject = ['$rootScope', '$scope', '$http', 'AuthService'];

  function globalsController($rootScope, $scope, $http, AuthService) {
    $scope.logout = AuthService.logout;
    
    AuthService.checkAuthentication(false);
    
    var getGlobalData = function() {
      var request = {
        method: 'GET',
        url: '/internal/globals',
        headers: { 'Accept': 'application/hal+json' }
      };
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
      $http(request)
          .success(successHandler)
          .error(errorHandler);
    };
    getGlobalData();
  }
};
