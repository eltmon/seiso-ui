module.exports = function(app) {
  app.config(RouteConfig);

  /* @ngInject */
  function RouteConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', stateConfig('/', 'Home', 'home/home'))
      .state('search', stateConfig('/search', 'Search', 'search'))
      .state('login', stateConfig('/login', 'Login', 'admin/login'))
      .state('admin', stateConfig('/admin', 'Admin', 'admin/index'))
      .state('mb', viewRoute('/mb', 'mb/index'))
      .state('mb:type', viewRoute('/mb:type', 'mb/profile'))
      .state('dataCenters', viewRoute('/data-centers', 'data-center/list/data-center/list'))
      .state('dataCenter', stateConfig('/data-centers/:key', 'data-center/details/data-center-details'))
      .state('environments', stateConfig('/environments', 'EnvironmentList', 'environment/list/'))
      .state('environment', stateConfig('/environments:key', 'EnvironmentDetails', 'environment/details/environment-details'))
      .state('loadBalancers', stateConfig('/load-balancers', 'LoadBalancerList', 'load-balancer/list/load-balancer-list'))
      .state('loadBalancer', stateConfig('/load-balancers/:name', 'LoadBalancerDetails', 'load-balancer/details/load-balancer-details'))
      .state('machine', stateConfig('/machines/:name', 'MachineDetails', 'machine/machine-details'))
      .state('node', stateConfig('/nodes/:name', 'NodeDetails', 'service-instance/details/nodes/details/node-details'))
      .state('peoples', stateConfig('/people', 'PersonList', 'person/list/person-list'))
      .state('person', stateConfig('/paople/:username', 'PersonDetails', 'person/details/person-details'))
      .state('services', stateConfig('/services', 'ServiceList', 'servie/list/service-list'))
      .state('service', viewRoute('/services/:key', 'service/details/service-details'))
      .state('serviceInstances', stateConfig('/service-instances', 'ServiceInstanceList', 'service-instance/list/service-instance-list'))
      .state('serviceInstance', viewRoute('/service-instances/:key', 'service-instance/details/service-instance-details'))
      .state('statuses', stateConfig('/statuses', 'StatusList', 'status/status-list'))
      .state('types', stateConfig('/types', 'TypeList', 'type/type-list'));
    // $routeProvider
    //   .when('/', route('Home', 'home/home'))
    //   .when('/search', route('Search', 'search'))
    //   .when('/login', route('Login', 'auth/login'))
    //   .when('/admin', route('Admin', 'admin/index'))
    //   .when('/mb', viewRoute('mb/index'))
    //   .when('/mb/:type', viewRoute('mb/profile'))
    //   .when('/data-centers', viewRoute('data-center/list/data-center-list'))
    //   .when('/data-centers/:key', route('DataCenterDetails', 'data-center/details/data-center-details'))
    //   .when('/environments', route('EnvironmentList', 'environment/list/environment-list'))
    //   .when('/environments/:key', route('EnvironmentDetails', 'environment/details/environment-details')) 
    //   .when('/load-balancers', route('LoadBalancerList', 'load-balancer/list/load-balancer-list'))
    //   .when('/load-balancers/:name', route('LoadBalancerDetails', 'load-balancer/details/load-balancer-details'))
    //   .when('/machines/:name', route('MachineDetails', 'machine/machine-details'))
    //   .when('/nodes/:name', route('NodeDetails', 'service-instance/details/nodes/details/node-details'))
    //   .when('/people', route('PersonList', 'person/list/person-list'))
    //   .when('/people/:username', route('PersonDetails', 'person/details/person-details'))
    //   .when('/services', route('ServiceList', 'service/list/service-list'))
    //   .when('/services/:key', viewRoute('service/details/service-details'))
    //   .when('/service-instances', route('ServiceInstanceList', 'service-instance/list/service-instance-list'))
    //   .when('/service-instances/:key', viewRoute('service-instance/details/service-instance-details'))
    //   .when('/statuses', route('StatusList', 'status/status-list'))
    //   .when('/types', route('TypeList', 'type/type-list'))
    //   .otherwise({ redirectTo : '/' });

    function stateConfig(url, controllerName, viewName) {
      return {
        url: url,
        controller: controllerName + 'Controller',
        controllerAs: 'vm',
        templateUrl: 'view/' + viewName + '.html'
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
