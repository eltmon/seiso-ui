module.exports = function(app) {
  
  app.controller('NodeBreakdownController', nodeBreakdownController);

  /* @ngInject */
  function nodeBreakdownController($scope, dataService, $routeParams, $http) {
    function getBreakdown(statusVar, path, resultVar) {
      $scope[statusVar] = 'loading';

      var successHandler = function(res) {
        console.log('breakdowns: ', res);
        var data = res.data._embedded ? res.data._embedded.breakdownItems : [];
        $scope[resultVar] = data;
        $scope[statusVar] = 'loaded';
      };

      var errorHandler = function(err) {
        $scope[statusVar] = 'error';
        return console.log(err);
      };

      dataService.get('/serviceInstances/search/findByKey?key=' + $routeParams.key)
        .then(function(res) {
          var siUrl = res.data._links.self.href + '/' + path;
          dataService.get(siUrl)
            .then(successHandler, errorHandler);
      }, function(err) {return console.log(err);});
    }
    getBreakdown('healthBreakdownStatus', 'healthBreakdown', 'healthBreakdown');
    getBreakdown('rotationBreakdownStatus', 'rotationBreakdown', 'rotationBreakdown');
  }
};
