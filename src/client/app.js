'use strict';

var jQuery = require('jquery')(window);
var async = require('async');

require('d3');
require('angular');
require('angular-route');
require('angular-sanitize');
var uibs = require('angular-ui-bootstrap');

var organizeDataCenters = require('./components/util/ng-mappers.js').organizeDataCenters;
var enrichNodeStats = require('./components/util/ng-mappers.js').enrichNodeStats;
var nodePageToNodeRows = require('./components/util/ng-mappers.js').nodePageToNodeRows;

var util = require('./components/util/util');
var route = util.route;
var viewRoute = util.viewRoute;

var app = angular.module('seiso', ['ngRoute', 'ngSanitize', 'seisoFilters', 'seisoServices', uibs]);

/**
 *    Controllers
 */

// General
require('./components/home/home-controller.js')(app);
require('./components/global/globals-controller.js')(app);
require('./components/auth/login-controller.js')(app);
require('./components/util/search-controller.js')(app);
require('./components/admin/admin-controller.js')(app);

// Eos Actions
require('./components/service-instance/details/eos-actions/eos-convict-controller.js')(app);
require('./components/service-instance/details/eos-actions/eos-deploy-controller.js')(app);
require('./components/service-instance/details/eos-actions/eos-interrogate-controller.js')(app);
require('./components/service-instance/details/eos-actions/eos-maintenance-mode-controller.js')(app);
require('./components/service-instance/details/eos-actions/eos-reload-controller.js')(app);
require('./components/service-instance/details/eos-actions/eos-set-active-controller.js')(app);
require('./components/service-instance/details/eos-actions/eos-soak-controller.js')(app);

// Data-center
require('./components/data-center/details/data-center-details-controller.js')(app);
require('./components/data-center/list/data-center-list-controller.js')(app);

// Environment
require('./components/environment/details/environment-details-controller.js')(app);
require('./components/environment/list/environment-list-controller.js')(app);

// Load Balancer
require('./components/load-balancer/details/load-balancer-details-controller.js')(app);
require('./components/load-balancer/list/load-balancer-list-controller.js')(app);

// Machine
require('./components/machine/machine-details-controller.js')(app);

// Person

require('./components/person/details/person-details-controller.js')(app);
require('./components/person/list/person-list-controller.js')(app);

// Service Instance
require('./components/service-instance/details/service-instance-details-controller.js')(app);
require('./components/service-instance/details/nodes/nodes-controller.js')(app);
require('./components/service-instance/details/dependencies/service-instance-dependencies-controller.js')(app);
require('./components/service-instance/details/dependencies/service-instance-dependents-controller.js')(app);
require('./components/service-instance/list/service-instance-list-controller.js')(app);

require('./components/person/details/person-details-controller.js')(app);
require('./components/person/list/person-list-controller.js')(app);

// Service Instance
require('./components/service-instance/details/service-instance-details-controller.js')(app);
require('./components/service-instance/details/nodes/nodes-controller.js')(app);
require('./components/service-instance/details/dependencies/service-instance-dependencies-controller.js')(app);
require('./components/service-instance/details/dependencies/service-instance-dependents-controller.js')(app);
require('./components/service-instance/list/service-instance-list-controller.js')(app);


// Nodes
require('./components/service-instance/details/dashboard/node-alerts-controller.js')(app);
require('./components/service-instance/details/dashboard/node-breakdown-controller.js')(app);
require('./components/service-instance/details/dashboard/node-summary-controller.js')(app);
require('./components/service-instance/details/dashboard/node-details-controller.js')(app);

// Service
require('./components/service/details/service-details-controller.js')(app);
require('./components/service/details/service-instances-controller.js')(app);
require('./components/service/details/service-documentation-controller.js')(app);
require('./components/service/list/service-list-controller.js')(app);

// Other
require('./components/status/status-list-controller.js')(app);
require('./components/type/type-list-controller.js')(app);

// MB
require('./components/mb/mb-controller.js')(app);

/**
 *    Services
 */
require('./components/dataService/dataService.service.js')(app);
require('./components/auth/auth.service.js')(app);
require('./components/util/ng-services.js')(angular);

/**
 *    Constants
 */
require('./components/util/ng-constants.js')(app);

require('./components/util/ng-directives.js')(app);

require('./components/util/ng-filters.js')(angular);


app.config(['$httpProvider', '$routeProvider', 'paginationConfig', function($httpProvider, $routeProvider, paginationConfig) {    
  $httpProvider.defaults.headers.common = {
    // TODO Migrate toward application/hal+json
    'Accept' : 'application/json',
    // https://spring.io/blog/2015/01/12/the-login-page-angular-js-and-spring-security-part-ii 
    'X-Requested-With' : 'XMLHttpRequest'
  };
  

  
  $routeProvider
    .when('/', route('Home', 'home/home'))
    .when('/search', route('Search', 'search'))
    .when('/login', route('Login', 'auth/login'))
    .when('/admin', route('Admin', 'admin/index'))
    .when('/mb', viewRoute('mb/index'))
    .when('/mb/:type', viewRoute('mb/profile'))
    .when('/data-centers', viewRoute('data-center/list/data-center-list'))
    .when('/data-centers/:key', route('DataCenterDetails', 'data-center/details/data-center-details'))
    .when('/environments', viewRoute('environment/list/environment-list'))
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
      
  // Pagination configuration. Is this the right place to do this?
  paginationConfig.itemsPerPage = 50;
  paginationConfig.maxSize = 7;
  paginationConfig.boundaryLinks = true;
  // FIXME Want to use &laquo;, &lsaquo;, etc., but Angular is escaping the &. [WLW] 
  paginationConfig.firstText = '<<';
  paginationConfig.previousText = '<';
  paginationConfig.nextText = '>';
  paginationConfig.lastText = '>>';
}]);

// TODO The functions here belong in a service. See
// http://stackoverflow.com/questions/11938380/global-variables-in-angularjs/11938785#11938785
// https://docs.angularjs.org/misc/faq ('$rootScope exists, but it can be used for evil')
app.run([ '$rootScope', '$http', function($rootScope, $http) {
  $rootScope.model = {
    page: {
      title: 'Seiso'
    }
  };
  $rootScope.uri = function(repoKey, itemKey) {
    if (!repoKey) {
      return '#/';
    } else if (!itemKey) {
      return '#/' + repoKey;
    } else {
      return '#/' + repoKey + '/' + itemKey;
    }
  };
  $rootScope.displayName = function(person) {
    // TODO Somehow the firstNameLastName thing actually works even for service owner, but since I have no idea
    // how, I'm not going to depend upon this quite yet.
    //return person.displayName == null ? person.firstNameLastName : person.displayName;
    return !person.displayName ? person.firstName + ' ' + person.lastName : person.displayName;
  };
}]);
