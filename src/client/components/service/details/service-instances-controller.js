module.exports = function(app) {

  app.controller('ServiceServiceInstancesController', serviceServiceInstancesController);

  serviceServiceInstancesController.$inject = ['$scope', 'v2Api', '$routeParams', '$http'];

  function serviceServiceInstancesController($scope, v2Api, $routeParams, $http) {
    $scope.serviceInstancesStatus = 'loading';
    console.log('si: ', $routeParams.key);
    console.log($scope.service);
    var path = 'http://localhost:8080/services/search/findByKey?key=' + $routeParams.key;

    $http.get(path)
      .then(function(res) {
        console.log('service req data: ', res);
        var siUrl = res.data._links.serviceInstances.href;
        $http.get(siUrl)
          .then(function(res) {
            console.log('si of s: ', res);
            $scope.serviceInstances = res.data._embedded.serviceInstances;
            $scope.serviceInstancesStatus = 'loaded';
          }, function(err) {
            console.log(err);
          });
      }, function(err) {
        console.log(err);
      });

    // console.log('service instances path: ', path);
    // var successHandler = function(data) {
    //   $scope.serviceInstances = data._embedded.items;
    //   $scope.serviceInstancesStatus = 'loaded';
    // };
    // var errorHandler = function() {
    //   $scope.serviceInstancesStatus = 'error';
    // };
    // v2Api.get(path, successHandler, errorHandler);
  }
};
