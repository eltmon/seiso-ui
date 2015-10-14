
var enrichNodeStats = require('../../../util/ng-mappers.js').enrichNodeStats;

module.exports = function(app) {

  app.controller('NodeSummaryController', nodeSummaryController);

  /* @ngInject */
  function nodeSummaryController($scope, dataService, $routeParams) {
    $scope.nodeStatsStatus = 'loading';
    
    var successHandler = function(res) {
      console.log(res);
      var siUrl = res.data._links.self.href + '/nodeSummary';
  
      dataService.get(siUrl).then(nodeSummarySuccess, function(err) {return console.log(err);});
      function nodeSummarySuccess(res) {
        console.log(res);
        var nodeStats = res.data;
        enrichNodeStats(nodeStats);
        $scope.nodeStats = nodeStats;
        
        var numHealthy = nodeStats.numHealthy;
        var numUnhealthy = nodeStats.numNodes - numHealthy;
        var numEnabled = nodeStats.numEnabled;
        var numNotEnabled = nodeStats.numNodes - numEnabled;
        var numHealthyGivenEnabled = nodeStats.numHealthyGivenEnabled;
        var numUnhealthyGivenEnabled = numEnabled - numHealthyGivenEnabled;
        

        $scope.healthDataset = [
          { type: 'Healthy', count: numHealthy }, 
          { type: 'Unhealthy', count: numUnhealthy }
        ];
        
        $scope.enabledDataset = [
          { type: 'Enabled', count: numEnabled }, 
          { type: 'Not enabled', count: numNotEnabled }
        ];
        
        $scope.healthyGivenEnabledDataset = [
          { type: 'Healthy given enabled', count: numHealthyGivenEnabled }, 
          { type: 'Unhealthy given enabled', count: numUnhealthyGivenEnabled }
        ];
        
        $scope.nodeStatsStatus = 'loaded';
      }
    };

    dataService.get('/serviceInstances/search/findByKey?key=' + $routeParams.key)
      .then(successHandler, function(err) {$scope.nodeStatsStatus = 'error';return;});
  }
};
