module.exports = function(app) {
  
  app.controller('NodeBreakdownController', nodeBreakdownController);

  /* @ngInject */
  function nodeBreakdownController($scope, dataService, $stateParams, $http) {
    function getBreakdown(statusVar, path, resultVar) {
      $scope[statusVar] = 'loading';

      var successHandler = function(res) {
        var data = res.data._embedded ? res.data._embedded.breakdownItems : [];
        $scope[resultVar] = data;
        $scope[statusVar] = 'loaded';
      };

      var errorHandler = function(err) {
        $scope[statusVar] = 'error';
      };

      dataService.get('/serviceInstances/search/findByKey?key=' + $stateParams.key)
        .then(function(res) {
          var siUrl = res.data._links.self.href + '/' + path;
          dataService.get(siUrl)
            .then(successHandler, errorHandler);
      }, errorHandler);
    }
    getBreakdown('healthBreakdownStatus', 'healthBreakdown', 'healthBreakdown');
    getBreakdown('rotationBreakdownStatus', 'rotationBreakdown', 'rotationBreakdown');
  }
};
