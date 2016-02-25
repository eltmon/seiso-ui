module.exports = function(app) {

  app.controller('ServiceInstanceDetailsController', serviceInstanceDetailsController);

  /* @ngInject */
  function serviceInstanceDetailsController(dataService, $stateParams, Page, AuthService) {
    var vm = this;
    vm.serviceInstanceStatus = 'loading';
    var serviceInstanceKey = $stateParams.key;
    var path = '/serviceInstances/search/findByKey?key=' + serviceInstanceKey;
    dataService.get(path)
      .then(successHandler, errorHandler);
    function successHandler(res) {
      var actualPath = res.data._links.self.href;
      dataService.get(actualPath + '?projection=serviceInstanceDetails')
        .then(siSuccess, function(err){ return console.log(err);});
      function siSuccess(res) {
        getServiceInstanceService(res.data._links.service.href);
        var si = res.data;
        var service = si.service;
        vm.serviceInstance = si;
        Page.setTitle(si.key);
        vm.dataCenter = si.dataCenter;
        vm.environment = si.environment;
        vm.ipAddressRoles = si.ipAddressRoles;
        vm.loadBalancer = si.loadBalancer;
        vm.ports = si.ports;
        vm.service = service;
        vm.owner = '';
        vm.dashboards = si.dashboards;
        vm.checks = si.seyrenChecks;
    
        vm.tabs = [
          { heading: 'Dashboard', content: 'dashboard/index' },
          { heading: 'All Nodes', content: 'nodes/node-pane' },
          { heading: 'Details', content: 'details/index' }
          // { heading: 'Dependencies', content: 'dependencies/dependencies-tables' },
        ];

        if (AuthService.authenticated() && dataService.showActions()) {
          vm.tabs.push({ heading: 'Actions', content: 'eos-actions/index' });
        }
        
        vm.setTabContent = function(name) {
          vm.tabContentUrl = 'view/service-instance/details/' + name + '.html';
        };
      
        vm.serviceInstanceStatus = 'loaded';
      }
    }

    var errorHandler = function() {
      vm.serviceInstanceStatus = 'error';
    };

    var gError = function(err) {
      return console.log(err);
    };

    function getServiceInstanceService(serviceHref) {
      dataService.get(serviceHref + '?projection=serviceDetails')
        .then(function(res) {
          vm.service = res.data;
        }, gError);
    }
    
  }
};
