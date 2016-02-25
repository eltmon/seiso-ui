module.exports = function(app) {
  
  app.controller('NodeBreakdownController', nodeBreakdownController);

  /* @ngInject */
  function nodeBreakdownController(dataService, $stateParams, $http) {
    var vm = this;
    function getBreakdown(statusVar, path, resultVar) {
      vm[statusVar] = 'loading';

      var successHandler = function(res) {
        var data = res.data._embedded ? res.data._embedded.breakdownItems : [];
        vm[resultVar] = data;
        vm[statusVar] = 'loaded';
      };

      var errorHandler = function(err) {
        vm[statusVar] = 'error';
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
