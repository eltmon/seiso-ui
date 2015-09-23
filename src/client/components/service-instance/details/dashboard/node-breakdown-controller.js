module.exports = function(app) {
  
  app.controller('NodeBreakdownController', nodeBreakdownController);

  nodeBreakdownController.$inject = ['$scope', '$http', '$routeParams'];

  function nodeBreakdownController($scope, $http, $routeParams) {
    function getBreakdown(statusVar, path, resultVar) {
      $scope[statusVar] = 'loading';
      var request = {
          method: 'GET',
          url: '/v2/service-instances/' + $routeParams.key + '/' + path,
          headers: { 'Accept': 'application/hal+json' }
      };
      var successHandler = function(data) {
        $scope[resultVar] = data;
        $scope[statusVar] = 'loaded';
      };
      $http(request)
      .success(successHandler)
      .error(function() { $scope[statusVar] = 'error'; });
    }
    getBreakdown('healthBreakdownStatus', 'health-breakdown', 'healthBreakdown');
    getBreakdown('rotationBreakdownStatus', 'rotation-breakdown', 'rotationBreakdown');
  }
};
