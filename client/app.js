'use strict';

var async = require('async');

var dependencies = [
  'ui.router',
  // 'ngAnimate',
  // 'ngAria',
  // 'ngMaterial',
  // 'ngMessages',
  'ui.bootstrap',
  // 'ngCookies',
  'seisoFilters',
  'seisoServices',
  'external.eos'
];

var app = angular.module('seiso', dependencies);

/**
 *    Controllers
 */

// General
require('./components/home/home-controller')(app);
require('./components/global/globals-controller')(app);
require('./components/auth/login-controller')(app);
require('./components/admin/admin-controller')(app);
require('./components/home/navbar-controller')(app);
require('./components/util/PageService')(app);

// Search
require('./components/home/search-controller')(app);
require('./components/search/search-results-controller')(app);

// Eos Actions
require('./components/service-instance/details/eos-actions')(angular);


// Data-center
require('./components/data-center/details/data-center-details-controller')(app);
require('./components/data-center/list/data-center-list-controller')(app);

// Environment
require('./components/environment/details/environment-details-controller')(app);
require('./components/environment/list/environment-list-controller')(app);

// Load Balancer
require('./components/load-balancer/details/load-balancer-details-controller')(app);
require('./components/load-balancer/list/load-balancer-list-controller')(app);

// Machine
require('./components/machine/machine-details-controller')(app);

// Person
require('./components/person/details/person-details-controller')(app);
require('./components/person/list/person-list-controller')(app);

// Service Instance
require('./components/service-instance/details/service-instance-details-controller')(app);
require('./components/service-instance/details/nodes/nodes-controller')(app);
require('./components/service-instance/details/dependencies/service-instance-dependencies-controller')(app);
require('./components/service-instance/details/dependencies/service-instance-dependents-controller')(app);
require('./components/service-instance/list/service-instance-list-controller')(app);

// Nodes
require('./components/service-instance/details/dashboard/node-alerts-controller')(app);
require('./components/service-instance/details/dashboard/node-breakdown-controller')(app);
require('./components/service-instance/details/dashboard/node-summary-controller')(app);
require('./components/service-instance/details/nodes/node-details-controller')(app);

// Service
require('./components/service/details/service-details-controller')(app);
require('./components/service/details/service-instances-controller')(app);
require('./components/service/details/service-documentation-controller')(app);
require('./components/service/list/service-list-controller')(app);

// Other
require('./components/status/status-list-controller')(app);
require('./components/type/type-list-controller')(app);

/**
 *    Services
 */
require('./components/dataService/dataService.service')(app);
require('./components/auth/auth.service')(app);
require('./components/util/ng-services')(angular);

/**
 *    Constants
 */
require('./components/util/ng-constants')(app);

require('./components/util/ng-directives')(app);

require('./components/util/ng-filters')(angular);

/**
 *    Config
 */
require('./app.config')(app);
require('./app.routes.js')(app);

/**
 *    Run
 */
require('./app.run')(app);
