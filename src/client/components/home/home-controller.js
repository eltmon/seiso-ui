module.exports = function(app) {

  app.controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($scope, $http, dataService, Page) {
    Page.setTitle('Home');
    $scope.serviceStatus = 'loading';

    dataService.get('/serviceGroups')
      .then(successHandler, function(err) { return console.log(err);});

    function successHandler(res) {
      var serviceGroups = res.data._embedded.serviceGroups;
      var serviceGroupsMap = {};
      
      serviceGroups.push({ 'key' : '_ungrouped', 'name' : 'Ungrouped' });
      serviceGroups.forEach(function(group) {
        group.services = [];
        serviceGroupsMap[group.key] = group;
      });
      
      $scope.serviceGroups = serviceGroupsMap;
      $scope.serviceStatus = 'loaded';
    }
    $scope.getServices = function(group) {
      if ($scope.serviceGroups[group.key].services.length > 0) {
        return;
      }
      dataService.get(group._links.services.href)
        .then(function(res) {
          $scope.serviceGroups[group.key].services = res.data._embedded.services;
        }, function(err) {
          if (err) return console.log(err);
      });
    };
  }
};
