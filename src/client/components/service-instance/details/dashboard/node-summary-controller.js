
var enrichNodeStats = require('../../../util/ng-mappers.js').enrichNodeStats;

module.exports = function(app) {

  app.controller('NodeSummaryController', nodeSummaryController);

  /* @ngInject */
  function nodeSummaryController($scope, dataService, $stateParams) {
    $scope.nodeStatsStatus = 'loading';
    
    var successHandler = function(res) {
      var siUrl = res.data._links.self.href + '/nodeSummary';
      dataService.get(siUrl).then(nodeSummarySuccess, function(err) {return console.log(err);});

      function nodeSummarySuccess(res) {
        console.log('node summary: ', res)
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
          { type: 'Healthy given enabled', count: numHealthyGivenEnabled || 0 }, 
          { type: 'Unhealthy given enabled', count: numUnhealthyGivenEnabled || 0 }
        ];
        
        $scope.nodeStatsStatus = 'loaded';
      }
    };

    var errorHandler = function(res) {
      $scope.nodeStatsStatus = 'error';
      return;
    };

    dataService.get('/serviceInstances/search/findByKey?key=' + $stateParams.key)
      .then(successHandler, errorHandler);
  }
};
