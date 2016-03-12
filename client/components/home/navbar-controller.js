module.exports = function(app) {
  
  app.controller('NavbarController', NavbarController);

  /* @ngInject */
  function NavbarController($scope, $http, AuthService, $mdMenu) {
    $scope.nav = {};
    $scope.AuthService = AuthService;
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

    // var originatorEv;

    // $scope.openMenu = function($mdOpenMenu, ev) {
    //   console.log(ev);
    //   originatorEv = ev;
    //   $mdOpenMenu(ev);
    // };
    // $('body').on('click', function(e) {
    //   $mdMenu.hide();
    // })

    // $scope.notificationsEnabled = true;
    // $scope.toggleNotifications = function() {
    //   $scope.notificationsEnabled = !$scope.notificationsEnabled;
    //   console.log()
    // };

    // $scope.redial = function() {
    //   $mdDialog.show(
    //     $mdDialog.alert()
    //       .targetEvent(originatorEv)
    //       .clickOutsideToClose(true)
    //       .parent('body')
    //       .title('Suddenly, a redial')
    //       .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
    //       .ok('That was easy')
    //   );

    //   originatorEv = null;
    // };
  }
};
