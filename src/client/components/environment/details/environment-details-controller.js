var pageTitle = require('../../util/util.js').pageTitle;
var EE = require('events').EventEmitter;
var ee = new EE();

module.exports = function(app) {

  app.controller('EnvironmentDetailsController', environmentDetailsController);

  /* @ngInject */
  function environmentDetailsController($scope, dataService, paginationConfig, $routeParams) {
    var siUrl;
    (function getEnvironment() {
      var successHandler = function(res) {
        siUrl = res.data._links.serviceInstances.href;
        ee.emit('si');
        var env = res.data;
        $scope.environment = env;
        $scope.model.page.title = pageTitle(env.name);
      };
      var errorHandler = function() { console.log('Error while getting environment.'); };
      dataService.get('/environments/search/findByKey?key=' + $routeParams.key)
        .then(successHandler, function(err) {console.log(err);});
    })();
    
    $scope.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
        
        ee.on('si', function() {
          (function getServiceInstances(pageNumber) {
            $scope.serviceInstanceListStatus = 'loading';
            var apiPageNumber = pageNumber - 1;
            var query = '?projection=serviceServiceInstances&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=key';
            var siRequest =  siUrl + query;
            var siSuccessHandler = function(res) {
              console.log(res);
              var siPage = res.data;
              $scope.serviceInstances = siPage._embedded.serviceInstances;
              $scope.serviceInstanceMetadata = siPage.metadata;
              $scope.serviceInstanceListStatus = 'loaded';
            };
            dataService.get(siRequest)
                .then(siSuccessHandler, function() { $scope.serviceInstanceListStatus = 'error'; });
          })($scope.model.serviceInstances.currentPage);          
        });
      }
    };
    
    $scope.model.serviceInstances.pageSelected();
  }
};
