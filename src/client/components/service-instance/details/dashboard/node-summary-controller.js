
var enrichNodeStats = require('../../../util/ng-mappers.js').enrichNodeStats;

module.exports = function(app) {

  app.controller('NodeSummaryController', nodeSummaryController);

  nodeSummaryController.$inject = ['$scope', '$http', '$routeParams'];
  
  function nodeSummaryController($scope, $http, $routeParams) {
    $scope.nodeStatsStatus = 'loading';
    
    var request = {
      method: 'GET',
      url: 'http://localhost:8080/serviceInstances/search/findByKey?key=' + $routeParams.key,
      headers: { 'Accept': 'application/hal+json' }
    };
    
    var successHandler = function(data) {
      var nodeStats = data;
      var siUrl = nodeStats._links.self.href + '/nodeSummary';
      $http.get(siUrl)
        .then(function(res) {
          nodeStats = res.data;
          console.log(nodeStats);
          console.log('nodeStats: ', nodeStats);
          return;
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
        }, function(err) {
          if (err) return console.log(err);
        });
    };
    
    $http(request)
        .success(successHandler)
        .error(function() { $scope.nodeStatsStatus = 'error'; });
  }
};
