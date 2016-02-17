module.exports = function(app) {
  
  app.controller('NavbarController', NavbarController);

  /* @ngInject */
  function NavbarController($scope, $http) {
    $scope.nav = {};
    // Get instances for navbar instance navigation
    $http
      .get('/instances')
      .then(function(res) {
        var instances = res.data.instances;
        var self = res.data.current_instance;
        for (var i = 0; i < instances.length; i++) {
          if (instances[i].name === self) {
            self = instances[i];
            break;
          }
        }
        $scope.nav.self = self;
        $scope.nav.seisoInstances = instances;
      });
  }
};
