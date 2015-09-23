var pageTitle = require('../util').pageTitle;
var async = require('async');

module.exports = function(app) {

  app.controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http'];

  function HomeController($scope, $http) {
    $scope.model.page.title = pageTitle('Home');
    $scope.serviceStatus = 'loading';
    
    var getServiceGroups = function(doneCallback) {
      $http.get('/v1/service-groups')
        .success(function(serviceGroups) { return doneCallback(null, serviceGroups); })
        .error(function(data) { return doneCallback(data, null); });
    };
    
    var getServices = function(doneCallback) {
      // FIXME If there are more than 300 services, we won't catch them all. We need a JS client for getting the
      // full list from the paging API. (The API will continue to page.) [WLW]
      $http.get('/v1/services?page=0&size=300&sort=name&view=home')
        .success(function(services) { return doneCallback(null, services); })
        .error(function(data) { return doneCallback(data, null); });
    };
    
    var iterator = function(f, doneCallback) { f(doneCallback); };
    async.map([getServiceGroups, getServices], iterator, function(err, results) {
      if (err) {
        $scope.serviceStatus = 'error';
        return;
      }
      
      var serviceGroups = results[0];
      var services = results[1];
      var serviceGroupsMap = {};
      
      serviceGroups.push({ 'key' : '_ungrouped', 'name' : 'Ungrouped' });
      serviceGroups.forEach(function(group) {
        group.services = [];
        serviceGroupsMap[group.key] = group;
      });
      
      services.forEach(function(service) {
        var key = (service.group === null ? '_ungrouped' : service.group.key);
        serviceGroupsMap[key].services.push(service);
      });
      
      $scope.serviceGroups = serviceGroups;
      $scope.serviceStatus = 'loaded';
    });
  }
};
