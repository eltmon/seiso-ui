module.exports = function(app) {
  
  app.controller('NodeBreakdownController', nodeBreakdownController);

  nodeBreakdownController.$inject = ['$scope', '$http', '$routeParams'];

  function nodeBreakdownController($scope, $http, $routeParams) {
    function getBreakdown(statusVar, path, resultVar) {
      $scope[statusVar] = 'loading';
      var request = {
          method: 'GET',
          url: 'http://localhost:8080/serviceInstances/search/findByKey?key=' + $routeParams.key,
          headers: { 'Accept': 'application/hal+json' }
      };
      var successHandler = function(res) {
        var data = res.data;
        $scope[resultVar] = data;
        $scope[statusVar] = 'loaded';
      };
      $http(request)
        .then(function(res) {
          var siUrl = res.data._links.self.href + '/' + path;
          $http.get(siUrl)
            .then(successHandler, function(err) {console.log(err);});

          }, function(err) {
            console.log(err);
            $scope[statusVar] = 'error';
          });
    }
    getBreakdown('healthBreakdownStatus', 'healthBreakdown', 'healthBreakdown');
    getBreakdown('rotationBreakdownStatus', 'rotationBreakdown', 'rotationBreakdown');
  }
};
