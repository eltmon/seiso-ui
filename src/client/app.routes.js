module.exports = function(app) {
  app.config(RouteConfig);

  /* @ngInject */
  function RouteConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
      .state('home', stateConfig('/', 'Home', 'home/home'))
      .state('search', stateConfig('/search', 'Search', 'search'))
      .state('login', stateConfig('/login', 'Login', 'auth/login'))
      .state('admin', stateConfig('/admin', 'Admin', 'admin/index'))
      .state('dataCenters', viewRoute('/data-centers', 'data-center/list/data-center-list'))
      .state('dataCenter', stateConfig('/data-centers/:key', 'DataCenterDetails', 'data-center/details/data-center-details'))
      .state('environments', stateConfig('/environments', 'EnvironmentList', 'environment/list/environment-list'))
      .state('environment', stateConfig('/environments/:key', 'EnvironmentDetails', 'environment/details/environment-details'))
      .state('loadBalancers', stateConfig('/load-balancers', 'LoadBalancerList', 'load-balancer/list/load-balancer-list'))
      .state('loadBalancer', stateConfig('/load-balancers/:name', 'LoadBalancerDetails', 'load-balancer/details/load-balancer-details'))
      .state('machine', stateConfig('/machines/:name', 'MachineDetails', 'machine/machine-details'))
      .state('node', stateConfig('/nodes/:name', 'NodeDetails', 'service-instance/details/nodes/details/node-details'))
      .state('peoples', stateConfig('/people', 'PersonList', 'person/list/person-list'))
      .state('person', stateConfig('/paople/:username', 'PersonDetails', 'person/details/person-details'))
      .state('services', stateConfig('/services', 'ServiceList', 'service/list/service-list'))
      .state('service', viewRoute('/services/:key', 'service/details/service-details'))
      .state('serviceInstances', stateConfig('/service-instances', 'ServiceInstanceList', 'service-instance/list/service-instance-list'))
      .state('serviceInstance', viewRoute('/service-instances/:key', 'service-instance/details/service-instance-details'))
      .state('statuses', stateConfig('/statuses', 'StatusList', 'status/status-list'))
      .state('types', stateConfig('/types', 'TypeList', 'type/type-list'));

    function stateConfig(url, controllerName, viewName) {
      return {
        url: url,
        controller: controllerName + 'Controller',
        controllerAs: 'vm',
        templateUrl: 'view/' + viewName + '.html',
        reload: false
      };
    }

    function viewRoute(url, shortViewName) {
      return {
        url: url,
        templateUrl: 'view/' + shortViewName + '.html'
      };
    }
  }
};
