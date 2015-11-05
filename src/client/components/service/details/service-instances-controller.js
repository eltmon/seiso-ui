var async = require('async');

module.exports = function(app) {

  app.controller('ServiceServiceInstancesController', serviceServiceInstancesController);

  /* @ngInject */
  function serviceServiceInstancesController($scope, $stateParams, dataService) {
    $scope.serviceInstancesStatus = 'loading';

    $scope.$on('onService', function(event) {
      $scope.service = event.targetScope.service;
      var successHandler = function(res) {
        $scope.serviceInstances = res.data._embedded.serviceInstances;
        $scope.serviceInstancesStatus = 'loaded';
        getSiNodes($scope.service);

      };
      var errorHandler = function(res) {
        $scope.serviceInstancesStatus = 'error';
      };

      var siLink = event.targetScope.service._links.serviceInstances.href;
      dataService.get(siLink + '?projection=serviceInstanceDetails')
        .then(successHandler, errorHandler);

      // TODO: we'll want to clean this up a bit. Possibly getting the node summary details with the
      // request to get all service instances.
      function getSiNodes(service) {
        var sSIHref = service._links.serviceInstances.href;
        dataService.get(sSIHref + '?mode=nodeDetails')
          .then(function(res) {
            console.log('mode=nodeDetails: ', res);
            var nodeDetails = res.data._embedded.serviceInstanceResources;
            var sis = $scope.serviceInstances;
            for (var i = 0; i < sis.length; i++) {
              for (var j = 0; j < nodeDetails.length; j++) {
                if (nodeDetails[j].key == $scope.serviceInstances[i].key) {
                  $scope.serviceInstances[i].nodesDetails = nodeDetails[j];
                }
              }
            }
          });
      }

    });
  }
};
