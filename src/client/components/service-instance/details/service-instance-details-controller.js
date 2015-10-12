var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('ServiceInstanceDetailsController', serviceInstanceDetailsController);

  serviceInstanceDetailsController.$inject = ['$scope', 'DataService', '$routeParams'];

  /* @ngInject */
  function serviceInstanceDetailsController($scope, DataService, $routeParams) {
    $scope.serviceInstanceStatus = 'loading';
    var serviceInstanceKey = $routeParams.key;

    var path = '/serviceInstances/search/findByKey?key=' + serviceInstanceKey;
    var ServiceInstance = new DataService(path);
    var successHandler = function(res) {
      var actualPath = res.data._links.self.href;
      var ServiceInstanceDetails = new DataService(actualPath + '?projection=serviceInstanceDetails');
      ServiceInstanceDetails.get(function(err, res) {
        if (err) return console.log(err);
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
      
      });
    };
    var errorHandler = function() {
      $scope.serviceInstanceStatus = 'error';
    };
    ServiceInstance.get(function(err, res) {
      if (err) return errorHandler();
      successHandler(res);
    });
  }
};
