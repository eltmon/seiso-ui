module.exports = function(app) {
  app.config(RouteConfig);

  /* @ngInject */
  function RouteConfig($routeProvider) {
    $routeProvider
      .when('/', route('Home', 'home/home'))
      .when('/search', route('Search', 'search'))
      .when('/login', route('Login', 'auth/login'))
      .when('/admin', route('Admin', 'admin/index'))
      .when('/mb', viewRoute('mb/index'))
      .when('/mb/:type', viewRoute('mb/profile'))
      .when('/data-centers', viewRoute('data-center/list/data-center-list'))
      .when('/data-centers/:key', route('DataCenterDetails', 'data-center/details/data-center-details'))
      .when('/environments', {
        controller: 'EnvironmentListController',
        controllerAs: 'vm',
        templateUrl: 'view/environment/list/environment-list.html'
      })
      .when('/environments/:key', route('EnvironmentDetails', 'environment/details/environment-details')) 
      .when('/load-balancers', route('LoadBalancerList', 'load-balancer/list/load-balancer-list'))
      .when('/load-balancers/:name', route('LoadBalancerDetails', 'load-balancer/details/load-balancer-details'))
      .when('/machines/:name', route('MachineDetails', 'machine/machine-details'))
      .when('/nodes/:name', route('NodeDetails', 'service-instance/details/nodes/details/node-details'))
      .when('/people', route('PersonList', 'person/list/person-list'))
      .when('/people/:username', route('PersonDetails', 'person/details/person-details'))
      .when('/services', {
        controller: 'ServiceListController',
        controllerAs: 'vm',
        templateUrl: 'view/service/list/service-list.html'
      })
      .when('/services/:key', viewRoute('service/details/service-details'))
      .when('/service-instances', route('ServiceInstanceList', 'service-instance/list/service-instance-list'))
      .when('/service-instances/:key', viewRoute('service-instance/details/service-instance-details'))
      .when('/statuses', route('StatusList', 'status/status-list'))
      .when('/types', route('TypeList', 'type/type-list'))
      .otherwise({ redirectTo : '/' });

    function route(controllerName, viewName) {
      return {
        controller: controllerName + 'Controller',
        templateUrl: 'view/' + viewName + '.html'
      };
    }

    function viewRoute(shortViewName) {
      return {
        templateUrl: 'view/' + shortViewName + '.html'
      };
    }
  }
};
