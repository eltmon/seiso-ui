module.exports = function(app) {
  
  app.controller('GlobalsController', globalsController);

  /* @ngInject */
  function globalsController($rootScope, $scope, DataService, AuthService) {
    $scope.logout = AuthService.logout;
    
    AuthService.checkAuthentication(false);
    
    var getGlobalData = function() {
      var GlobalData = new DataService('/internal/globals');
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
      GlobalData.get(function(err, res) {
        if (err) return errorHandler();
        successHandler(res);
      });
    };
    getGlobalData();
  }
};
