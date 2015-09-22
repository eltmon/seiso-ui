'use strict';

//window.jQuery = window.$ = require('jquery');

// require('d3');
require('angular');
require('angular-route');
require('angular-sanitize');
var uibs = require('angular-ui-bootstrap');

var organizeDataCenters = require('./ng-mappers.js').organizeDataCenters;
var enrichNodeStats = require('./ng-mappers.js').enrichNodeStats;
var nodePageToNodeRows = require('./ng-mappers.js').nodePageToNodeRows;

var route = require('./util').route;
var viewRoute = require('./util').viewRoute;
var pageTitle = require('./util').pageTitle;

var async = require('async');

angular.module('uibs', [uibs]);
var app = angular.module('seiso', [ 'ngRoute', 'ngSanitize', 'uibs', 'seisoFilters', 'seisoServices' ]);

/**
 * 		Controllers
 */

// General
require('./controllers/home-controller.js')(app);
require('./controllers/globals-controller.js')(app);
require('./controllers/login-controller.js')(app);
require('./controllers/search-controller.js')(app);
require('./controllers/admin-controller.js')(app);

// Eos Actions
require('./controllers/service-instance/details/eos-actions/eos-convict-controller.js')(app);
require('./controllers/service-instance/details/eos-actions/eos-deploy-controller.js')(app);
require('./controllers/service-instance/details/eos-actions/eos-interrogate-controller.js')(app);
require('./controllers/service-instance/details/eos-actions/eos-maintenance-mode-controller.js')(app);
require('./controllers/service-instance/details/eos-actions/eos-reload-controller.js')(app);
require('./controllers/service-instance/details/eos-actions/eos-set-active-controller.js')(app);
require('./controllers/service-instance/details/eos-actions/eos-soak-controller.js')(app);

// Data-center
require('./controllers/data-center/details/data-center-details-controller.js')(app);
require('./controllers/data-center/list/data-center-list-controller.js')(app);

// Environment
require('./controllers/environment/details/environment-details-controller.js')(app);
require('./controllers/environment/list/environment-list-controller.js')(app);

// Load Balancer
require('./controllers/load-balancer/details/load-balancer-details-controller.js')(app);
require('./controllers/load-balancer/list/load-balancer-list-controller.js')(app);

// Machine
require('./controllers/machine-details-controller.js')(app);

// Person

require('./controllers/person/details/person-details-controller.js')(app);
require('./controllers/person/list/person-list-controller.js')(app);

// Service Instance
require('./controllers/service-instance/details/service-instance-details-controller.js')(app);
require('./controllers/service-instance/details/nodes/nodes-controller.js')(app);
require('./controllers/service-instance/details/dependencies/service-instance-dependencies-controller.js')(app);
require('./controllers/service-instance/details/dependencies/service-instance-dependents-controller.js')(app);
require('./controllers/service-instance/list/service-instance-list-controller.js')(app);

require('./controllers/person/details/person-details-controller.js')(app);
require('./controllers/person/list/person-list-controller.js')(app);

// Service Instance
require('./controllers/service-instance/details/service-instance-details-controller.js')(app);
require('./controllers/service-instance/details/nodes/nodes-controller.js')(app);
require('./controllers/service-instance/details/dependencies/service-instance-dependencies-controller.js')(app);
require('./controllers/service-instance/details/dependencies/service-instance-dependents-controller.js')(app);
require('./controllers/service-instance/list/service-instance-list-controller.js')(app);


// Nodes
require('./controllers/service-instance/details/dashboard/node-alerts-controller.js')(app);
require('./controllers/service-instance/details/dashboard/node-breakdown-controller.js')(app);
require('./controllers/service-instance/details/dashboard/node-summary-controller.js')(app);
require('./controllers/service-instance/details/dashboard/node-details-controller.js')(app);

// Service
require('./controllers/service/details/service-details-controller.js')(app);
require('./controllers/service/details/service-instances-controller.js')(app);
require('./controllers/service/details/service-documentation-controller.js')(app);
require('../components/serviceList/serviceList.controller.js')(app);

// Other
require('./controllers/status-list-controller.js')(app);
require('./controllers/type-list-controller.js')(app);

// MB
require('./controllers/mb-controller.js')(app);

/**
 * 		Services
 */
require('./ng-services.js')(angular);

/**
 * 		Constants
 */
require('./ng-constants.js')(app);
require('./ng-directives.js')(app);
require('./ng-filters.js')(angular);


app.config(['$httpProvider', '$routeProvider', 'paginationConfig', function($httpProvider, $routeProvider, paginationConfig) {		
	$httpProvider.defaults.headers.common = {
		// TODO Migrate toward application/hal+json
		"Accept" : "application/json",
		// https://spring.io/blog/2015/01/12/the-login-page-angular-js-and-spring-security-part-ii 
		"X-Requested-With" : "XMLHttpRequest"
	};
	

	
	$routeProvider
			.when('/', route('Home', 'home/home'))
			.when('/search', route('Search', 'search/search'))
			.when('/login', route('Login', 'login/login'))
			.when('/admin', route('Admin', 'admin/index'))
			.when('/mb', viewRoute("mb/index"))
			.when('/mb/:type', viewRoute("mb/profile"))
			.when('/data-centers', viewRoute("items/data-center/list/data-center-list"))
			.when('/data-centers/:key', route('DataCenterDetails', 'items/data-center/details/data-center-details'))
			.when('/environments', viewRoute("items/environment/list/environment-list"))
			.when('/environments/:key', route('EnvironmentDetails', 'items/environment/details/environment-details')) 
			.when('/load-balancers', route('LoadBalancerList', 'items/load-balancer/list/load-balancer-list'))
			.when('/load-balancers/:name', route('LoadBalancerDetails', 'items/load-balancer/details/load-balancer-details'))
			.when('/machines/:name', route('MachineDetails', 'items/machine/details/machine-details'))
			.when('/nodes/:name', route('NodeDetails', 'items/node/details/node-details'))
			.when('/people', route('PersonList', 'items/person/list/person-list'))
			.when('/people/:username', route('PersonDetails', 'items/person/details/person-details'))
			.when('/services', { controller: 'ServiceListController', templateUrl: 'view/serviceList/serviceList.html' })
			.when('/services/:key', viewRoute("items/service/details/service-details"))
			.when('/service-instances', route('ServiceInstanceList', 'items/service-instance/list/service-instance-list'))
			.when('/service-instances/:key', viewRoute("items/service-instance/details/service-instance-details"))
			.when('/statuses', route('StatusList', 'items/status/list/status-list'))
			.when('/types', route('TypeList', 'items/type/list/type-list'))
			.otherwise({ redirectTo : '/' });
			
	// Pagination configuration. Is this the right place to do this?
	paginationConfig.itemsPerPage = 50;
	paginationConfig.maxSize = 7;
	paginationConfig.boundaryLinks = true;
	// FIXME Want to use &laquo;, &lsaquo;, etc., but Angular is escaping the &. [WLW] 
	paginationConfig.firstText = '<<';
	paginationConfig.previousText = "<";
	paginationConfig.nextText = '>';
	paginationConfig.lastText = '>>';
}]);

// TODO The functions here belong in a service. See
// http://stackoverflow.com/questions/11938380/global-variables-in-angularjs/11938785#11938785
// https://docs.angularjs.org/misc/faq ("$rootScope exists, but it can be used for evil")
app.run([ '$rootScope', '$http', function($rootScope, $http) {
	$rootScope.model = {
		page: {
			title: 'Seiso'
		}
	};
	$rootScope.uri = function(repoKey, itemKey) {
		if (repoKey == null) {
			return '#/';
		} else if (itemKey == null) {
			return '#/' + repoKey;
		} else {
			return '#/' + repoKey + '/' + itemKey;
		}
	};
	$rootScope.displayName = function(person) {
		// TODO Somehow the firstNameLastName thing actually works even for service owner, but since I have no idea
		// how, I'm not going to depend upon this quite yet.
		//return person.displayName == null ? person.firstNameLastName : person.displayName;
		return person.displayName == null ? person.firstName + " " + person.lastName : person.displayName;
	};
}]);
