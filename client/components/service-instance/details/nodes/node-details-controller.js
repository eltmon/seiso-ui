module.exports = function(app) {

  app.controller('NodeDetailsController', nodeDetailsController);

  /* @ngInject */
  function nodeDetailsController($scope, dataService, $stateParams, Page) {
    var successHandler = function(res) {
      Page.setTitle(res.data.name);
      $scope.node = res.data;

      if ($scope.node !== null) {
        var nodeSIHref = $scope.node._links.serviceInstance.href;
        dataService.get(nodeSIHref + '?projection=serviceInstanceDetails')
          .then(function(res) {
            $scope.serviceInstance = res.data;

            if ($scope.serviceInstance !== null) {
              var siServiceHref = $scope.serviceInstance._links.service.href;
              $scope.environment = res.data.environment;
              $scope.dataCenter = res.data.dataCenter;
              dataService.get(siServiceHref + '?projection=serviceDetails')
                .then(function(res) {
                  $scope.service = res.data;

                  if ($scope.dataCenter !== null) {
                    dataService.get($scope.serviceInstance._links.dataCenter.href)
                      .then(function(res) {
                        dataService.get(res.data._links.region.href)
                          .then(function(res) {
                            $scope.region = res.data;

                            if ($scope.region !== null) {
                              dataService.get(res.data._links.infrastructureProvider.href)
                                .then(function(res) {
                                  $scope.infrastructureProvider = res.data;
                                });
                            }
                          });
                    });
                  }

                  var sOwnerHref = res.data._links.owner.href;
                  dataService.get(sOwnerHref)
                    .then(function(res) {
                      $scope.owner = res.data;
                      console.log('scope owner: ', $scope.owner);
                      if ($scope.owner !== null) {
                        $scope.owner.fullName = $scope.displayName($scope.owner);
                      }
                    });
                });
            }
          });

        var nodeMachineHref = $scope.node._links.machine.href;
        dataService.get(nodeMachineHref)
          .then(function(res) {
            $scope.machine = res.data;
          }, function(err) {
            if (err) return console.log(err);
          });

        if ($scope.node.healthStatus !== null) {
          var healthStatusHref = $scope.node._links.healthStatus.href + '?projection=healthStatusDetails';
          dataService.get(healthStatusHref)
            .then(function(res) {
              $scope.node.healthStatus = hs = res.data;
            });
        }
      }
    };
    
    dataService.get('/nodes/search/findByName?name=' + $stateParams.name + '&projection=nodeDetails')
        .then(successHandler, function() { console.log('Error while getting node.');});
  }
};
