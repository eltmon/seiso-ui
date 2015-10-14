var pageTitle = require('../../util/util.js').pageTitle;

module.exports = function(app) {

  app.controller('LoadBalancerDetailsController', loadBalancerDetailsController);

  /* @ngInject */
  function loadBalancerDetailsController($scope, $http, $routeParams, dataService) {
    dataService.get('/loadBalancers/search/findByName?name=' + $routeParams.name)
      .then(function(res) {
        $http.get(res.data._links.self.href + '?projection=loadBalancersList')
          .then(function(res) {
            $scope.model.page.title = pageTitle(res.data.name);
            $scope.loadBalancer = res.data;
          }, function(res) {
            console.log(res);
          });

        $http.get(res.data._links.serviceInstances.href + '?projection=serviceServiceInstances')
          .then(function(res) {
            $scope.serviceInstances = res.data._embedded.serviceInstances; 
          }, function(res) {
            console.log(res);
          });
      }, function() { 
        console.log('Error while getting load balancer.');
      });
  }
};