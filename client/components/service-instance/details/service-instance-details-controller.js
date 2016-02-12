module.exports = function(app) {

  app.controller('ServiceInstanceDetailsController', serviceInstanceDetailsController);

  /* @ngInject */
  function serviceInstanceDetailsController($scope, dataService, $stateParams, Page) {
    $scope.serviceInstanceStatus = 'loading';
    var serviceInstanceKey = $stateParams.key;
    var path = '/serviceInstances/search/findByKey?key=' + serviceInstanceKey;
    dataService.get(path).then(successHandler, errorHandler);
    function successHandler(res) {
      var actualPath = res.data._links.self.href;
      dataService.get(actualPath + '?projection=serviceInstanceDetails').then(siSuccess, function(err){ return console.log(err);});
      function siSuccess(res) {
        getServiceInstanceService(res.data._links.service.href);
        var si = res.data;
        var service = si.service;
        $scope.serviceInstance = si;
        Page.setTitle(si.key);
        $scope.dataCenter = si.dataCenter;
        $scope.environment = si.environment;
        $scope.ipAddressRoles = si.ipAddressRoles;
        $scope.loadBalancer = si.loadBalancer;
        $scope.ports = si.ports;
        $scope.service = service;
        $scope.owner = '';
        $scope.dashboards = si.dashboards;
        $scope.checks = si.seyrenChecks;
    
        $scope.tabs = [
          { heading: 'Dashboard', content: 'dashboard/index' },
          { heading: 'All Nodes', content: 'nodes/node-pane' },
          { heading: 'Details', content: 'details/index' },
          // { heading: 'Dependencies', content: 'dependencies/dependencies-tables' },
          { heading: 'Actions', content: 'eos-actions/index' }
        ];

        // if ($scope.globals.enableActions) {
        //   $scope.tabs.push({ heading: 'Actions', content: 'eos-actions/index' });
        // }
        
        $scope.setTabContent = function(name) {
          $scope.tabContentUrl = 'view/service-instance/details/' + name + '.html';
        };
      
        $scope.serviceInstanceStatus = 'loaded';
      }
    }

    var errorHandler = function() {
      $scope.serviceInstanceStatus = 'error';
    };

    var gError = function(err) {
      return console.log(err);
    };

    function getServiceInstanceService(serviceHref) {
      dataService.get(serviceHref + '?projection=serviceDetails')
        .then(function(res) {
          $scope.service = res.data;
        }, gError);
    }
    
  }
};