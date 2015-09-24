var pageTitle = require('../util/util').pageTitle;
var async = require('async');

module.exports = function(app) {

  app.controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($scope, $http) {
    $scope.model.page.title = pageTitle('Home');
    $scope.serviceStatus = 'loading';
    
    var getServiceGroups = function(doneCallback) {
      $http.get('http://localhost:8080/serviceGroups')
        .success(function(serviceGroups) { return doneCallback(null, serviceGroups); })
        .error(function(data) { return doneCallback(data, null); });
    };

    $scope.getServices = function(group) {
      if ($scope.serviceGroups[group.key].services.length > 0) {
        console.log('services already fetched for group');
        return;
      }
      console.log('fetching group services');
      console.log(group._links.services.href);
      console.log(group);
      $http.get(group._links.services.href)
        .then(function(res) {
          $scope.serviceGroups[group.key].services = res.data._embedded.services;
        }, function(err) {
          console.log(err);
        });
    };
    
    // var getServices = function(doneCallback) {
    //   // FIXME If there are more than 300 services, we won't catch them all. We need a JS client for getting the
    //   // full list from the paging API. (The API will continue to page.) [WLW]
    //   $http.get('http://localhost:8080/services')
    //     .success(function(services) { return doneCallback(null, services); })
    //     .error(function(data) { return doneCallback(data, null); });
    // };
    
    var iterator = function(f, doneCallback) { f(doneCallback); };
    async.map([getServiceGroups], iterator, function(err, results) {
      console.log(results);
      if (err) {
        $scope.serviceStatus = 'error';
        return;
      }
      
      var serviceGroups = results[0]._embedded.serviceGroups;
      // var services = results[1]._embedded.services;
      var serviceGroupsMap = {};
      
      serviceGroups.push({ 'key' : '_ungrouped', 'name' : 'Ungrouped' });
      serviceGroups.forEach(function(group) {
        group.services = [];
        serviceGroupsMap[group.key] = group;
      });
      
      // services.forEach(function(service) {
      //   console.log(service);
      //   var key = (service.group === null ? '_ungrouped' : service.key);
      //   serviceGroupsMap[service.key].services.push(service);

      // });
      
      $scope.serviceGroups = serviceGroupsMap;
      console.log(serviceGroupsMap);
      $scope.serviceStatus = 'loaded';
    });
  }
};
