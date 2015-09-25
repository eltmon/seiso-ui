var async = require('async');

module.exports = function(app) {

  app.controller('ServiceServiceInstancesController', serviceServiceInstancesController);

  serviceServiceInstancesController.$inject = ['$scope', 'v2Api', '$routeParams', '$http'];

  function serviceServiceInstancesController($scope, v2Api, $routeParams, $http) {
    $scope.serviceInstancesStatus = 'loading';

    $scope.$on('onService', function(event) {
      $scope.service = event.targetScope.service;
      var siUrl = $scope.service._links.serviceInstances.href;
      $http.get(siUrl + '?projection=serviceServiceInstances')
        .then(function(res) {
          console.log(res);
          $scope.serviceInstances = res.data._embedded.serviceInstances;
          console.log($scope.serviceInstances);
          $scope.serviceInstancesStatus = 'loaded';

          // async.each($scope.serviceInstances, function(si, cb) {
          //   var nodesUri = si._links.nodes.href;
          //   var dcUri = si._links.dataCenter.href;
          //   var envUri = si._links.dataCenter.href;
          //   $http.get(nodesUri)
          //     .then(function(res) {
          //       si.nodes = res.data.key;
          //       $http.get(dcUri)
          //         .then(function(res) {
          //           si.dataCenter = res.data;
          //           $http.get(envUri)
          //             .then(function(res) {
          //               si.environment = res.data;
          //               cb();
          //             }, function(err){return cb(err);})
          //         }, function(err) {return cb(err);});
          //     }, function(err) {
          //       console.log(err);
          //       cb(err);
          //     });
          // }, function(err) {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.log('done processing si\'s');
          //     console.log($scope.serviceInstances);
          //   }
          // });


        }, function(err) {
          console.log(err);
          $scope.serviceInstancesStatus = 'error';
        });
    });

  }
};
