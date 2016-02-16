module.exports = function(app) {
  
  app.controller('NavbarController', NavbarController);

  /* @ngInject */
  function NavbarController($scope, $http) {
    $scope.nav = {};
    // Get instances for navbar instance navigation
    $http
      .get('/instances')
      .then(function(res) {
        var self = res.data.instances.self;
        $scope.nav.self = self;
        var instances = [];
        var sInstances = res.data.instances.env;
        for (var k in sInstances) {
          instances.push(sInstances[k]);
        }
        $scope.nav.seisoInstances = instances;
      });
  }
};
