var pageTitle = require('../util/util').pageTitle;
var async = require('async');

module.exports = function(app) {

  app.controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($scope, $http) {
    $scope.model.page.title = pageTitle('Home');
    $scope.serviceStatus = 'loading';
    
    var getServiceGroups = function(doneCallback) {
      var successHandler = function(serviceGroups) { return doneCallback(null, serviceGroups);}; 
      var errorHandler = function(data) { return doneCallback(data, null);};
      $http.get('http://localhost:8080/serviceGroups')
        .then(successHandler, errorHandler);
    };

    $scope.getServices = function(group) {
      if ($scope.serviceGroups[group.key].services.length > 0) {
        console.log('services already fetched for group');
        return;
      }
      $http.get(group._links.services.href)
        .then(function(res) {
          $scope.serviceGroups[group.key].services = res.data._embedded.services;
        }, function(err) {
          console.log(err);
        });
    };
    
    getServiceGroups(function(err, res) {
      if (err) {
        $scope.serviceStatus = 'error';
        return;
      }
      
      var serviceGroups = res.data._embedded.serviceGroups;
      var serviceGroupsMap = {};
      
      serviceGroups.push({ 'key' : '_ungrouped', 'name' : 'Ungrouped' });
      serviceGroups.forEach(function(group) {
        group.services = [];
        serviceGroupsMap[group.key] = group;
      });
      
      $scope.serviceGroups = serviceGroupsMap;
      $scope.serviceStatus = 'loaded';
    });
  }
};
