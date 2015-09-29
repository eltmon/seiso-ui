var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('LoadBalancerDetailsController', loadBalancerDetailsController);

  /*@ngInject*/
  function loadBalancerDetailsController($scope, $http, $routeParams) {
    // TODO Move to service
    $http.get('http://localhost:8080/loadBalancers/search/findByName?name=' + $routeParams.name)
      .then(function(res) {
        console.log('thing: ', res);
        $http.get(res.data._links.self.href + '?projection=loadBalancersList')
          .then(function(res) {
            console.log('self proj: ', res);
            $scope.model.page.title = pageTitle(res.data.name);
            $scope.loadBalancer = res.data;
          }, function(res) {
            console.log(res);
          });

        $http.get(res.data._links.serviceInstances.href + '?projection=serviceServiceInstances')
          .then(function(res) {
            console.log(res);
            $scope.serviceInstances = res.data._embedded.serviceInstances; 
          }, function(res) {
            console.log(res);
          });
      }, function() { 
        console.log('Error while getting load balancer.');
      });
  }
};