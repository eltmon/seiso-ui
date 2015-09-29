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

/**
 *    Config
 */
require('./app.config.js')(app);
require('./app.routes.js')(app);

/**
 *    Run
 */
require('./app.run.js')(app);
