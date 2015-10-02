var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('ServiceInstanceDetailsController', serviceInstanceDetailsController);

  serviceInstanceDetailsController.$inject = ['$scope', '$http', '$routeParams'];

  function serviceInstanceDetailsController($scope, $http, $routeParams) {
    $scope.serviceInstanceStatus = 'loading';
    var serviceInstanceKey = $routeParams.key;

    var path = 'http://localhost:8080/serviceInstances/search/findByKey?key=' + serviceInstanceKey;

    var successHandler = function(res) {
      console.log(res);
      var actualPath = res.data._links.self.href;
      $http.get(actualPath + '?projection=serviceInstanceDetails')
        .then(function(res) {
          console.log('serviceInstanceDetails: ', res);
          
          var si = res.data;
          var service = si.service;
          $scope.serviceInstance = si;
          $scope.model.page.title = pageTitle(si.key);
          $scope.dataCenter = si.dataCenter;
          $scope.environment = si.environment;
          $scope.ipAddressRoles = si.ipAddressRoles;
          $scope.loadBalancer = si.loadBalancer;
          $scope.ports = si.ports;
          $scope.service = service;
          $scope.owner = 'change this';
          $scope.dashboards = si.dashboards;
          $scope.checks = si.seyrenChecks;
      
          $scope.tabs = [
            { heading: 'Dashboard', content: 'dashboard/index' },
            { heading: 'All Nodes', content: 'nodes/node-pane' },
            { heading: 'Details', content: 'details/index' },
            { heading: 'Dependencies', content: 'dependencies/dependencies-tables' }
          ];
          
          if ($scope.globals.enableActions) {
            $scope.tabs.push({ heading: 'Actions', content: 'eos-actions/index' });
          }
          
          $scope.setTabContent = function(name) {
            $scope.tabContentUrl = 'view/service-instance/details/' + name + '.html';
          };
        
          $scope.serviceInstanceStatus = 'loaded';
      
      }, function(err) {
        console.log(err);
      });
    };
    var errorHandler = function() {
      $scope.serviceInstanceStatus = 'error';
    };
    $http.get(path)
      .then(successHandler, errorHandler);
  }
};
