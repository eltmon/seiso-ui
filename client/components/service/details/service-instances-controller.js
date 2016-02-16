
module.exports = function(app) {

  app.controller('ServiceServiceInstancesController', serviceServiceInstancesController);

  /* @ngInject */
  function serviceServiceInstancesController($scope, $stateParams, dataService) {
    var vm = this;
    vm.serviceInstancesStatus = 'loading';

    $scope.$on('onService', function(event) {
      vm.service = event.targetScope.vm.service;
      var siLink = vm.service._links.serviceInstances.href;
      dataService.get(siLink + '?projection=serviceInstanceDetails')
        .then(successHandler, errorHandler);

      function successHandler(res) {
        vm.serviceInstances = res.data._embedded.serviceInstances;
        vm.serviceInstancesStatus = 'loaded';
        getSiNodes(vm.service);
      }

      function errorHandler(res) {
        vm.serviceInstancesStatus = 'error';
      }

      // TODO: we'll want to clean this up a bit. Possibly getting the node summary details with the
      // request to get all service instances.
      function getSiNodes(service) {
        var sSIHref = service._links.serviceInstances.href;
        dataService.get(sSIHref + '?mode=nodeDetails')
          .then(function(res) {

            if (!res.data._embedded) return;
            var nodeDetails = res.data._embedded.serviceInstanceResources;
            var sis = vm.serviceInstances;
            for (var i = 0; i < sis.length; i++) {
              for (var j = 0; j < nodeDetails.length; j++) {
                if (nodeDetails[j].key == vm.serviceInstances[i].key) {
                  vm.serviceInstances[i].nodesDetails = nodeDetails[j];
                }
              }
            }
          });
      }

    });
  }
};
