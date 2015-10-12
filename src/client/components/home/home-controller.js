var pageTitle = require('../util/util').pageTitle;
var async = require('async');

module.exports = function(app) {

  app.controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($scope, $http, DataService) {
    $scope.model.page.title = pageTitle('Home');
    $scope.serviceStatus = 'loading';

    var ServiceGroups = new DataService('/serviceGroups');
    ServiceGroups.get(function(err, res) {
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

    $scope.getServices = function(group) {
      if ($scope.serviceGroups[group.key].services.length > 0) {
        console.log('services already fetched for group');
        return;
      }
      var GroupServices = new DataService(group._links.services.href);
      GroupServices.get(function(err, res) {
        if (err) return console.log(err);
        $scope.serviceGroups[group.key].services = res.data._embedded.services;
      });
    };
    
  }
};
