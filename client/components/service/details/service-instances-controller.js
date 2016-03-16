
module.exports = function(app) {

  app.controller('ServiceServiceInstancesController', serviceServiceInstancesController);

  /* @ngInject */
  function serviceServiceInstancesController($scope, $stateParams, dataService) {
    var vm = this;
    vm.serviceInstancesStatus = 'loading';
    // dataService.get('/services/search/findByKey?key=' + $stateParams.key)
    //   .then(function(res) {
    
    // Since service loads in parent scope from an async request, we watch for that value to change.
    // $watch will fire once on its initial load. If it loads before the service object has returned, we should ignore it.
    // See: https://stackoverflow.com/questions/16947771/how-do-i-ignore-the-initial-load-when-watching-model-changes-in-angularjs
    $scope.$watch('service', function(newVal, oldVal) {
        if (!$scope.service) return;
        vm.service = $scope.service;
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
