var EE = require('events').EventEmitter;
var ee = new EE();

module.exports = function(app) {

  app.controller('EnvironmentDetailsController', environmentDetailsController);

  /* @ngInject */
  function environmentDetailsController($scope, dataService, paginationConfig, $stateParams, Page) {
    var siUrl;
    var vm = this;
    $scope.model = {};
    
    getEnvironment();

    $scope.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
        
        ee.on('si', function() {
          (function getServiceInstanceNodeDetails(pageNumber) {
            $scope.serviceInstanceListStatus = 'loading';
            var apiPageNumber = pageNumber - 1;
            var query = '?mode=nodeDetails' + 
                        '&page=' + apiPageNumber + 
                        '&size=' + paginationConfig.itemsPerPage + 
                        '&sort=key';
            var siRequest =  siUrl + query;
            var siSuccessHandler = function(res) {
              if (!res.data._embedded) {
                $scope.serviceInstances = [];
                $scope.serviceInstanceMetadata = res.data.metadata;
                $scope.serviceInstanceListStatus = 'loaded';
                return;
              }
              $scope.serviceInstanceMetadata = res.data.metadata;
              $scope.serviceInstanceListStatus = 'loaded';
              var nodeDetails = res.data._embedded.serviceInstanceResources;
              var sis = $scope.serviceInstances;
              for (var i = 0; i < sis.length; i++) {
                for (var j = 0; j < nodeDetails.length; j++) {
                  if (nodeDetails[j].key == $scope.serviceInstances[i].key) {
                    $scope.serviceInstances[i].nodesDetails = nodeDetails[j];
                  }
                }
              }
            };
            dataService.get(siRequest)
              .then(siSuccessHandler, function(err) { return console.log(err); });
          })($scope.model.serviceInstances.currentPage);
        });
      }
    };

    function getServiceInstanceDetails(siUrl, cb) {
      dataService.get(siUrl)
        .then(function(res) {
          $scope.serviceInstances = res.data._embedded.serviceInstances;
          $scope.serviceInstanceListStatus = 'loaded';
          cb();
        }, function(res) {
          return console.log('error getting service instances: ', res);
        });
    }

    $scope.model.serviceInstances.pageSelected();

    function getEnvironment() {
      var successHandler = function(res) {
        siUrl = res.data._links.serviceInstances.href;
        $scope.environment = res.data;
        Page.setTitle($scope.environment.name);
        getServiceInstanceDetails(siUrl + '?projection=serviceInstanceDetails', function() {
          ee.emit('si');
        });
      };
      var errorHandler = function() { return console.log('Error while getting environment.'); };
      dataService.get('/environments/search/findByKey?key=' + $stateParams.key)
        .then(successHandler, function(err) {console.log(err);});
    }

  }
};
