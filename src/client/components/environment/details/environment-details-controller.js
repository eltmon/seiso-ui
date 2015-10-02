var pageTitle = require('../../util/util').pageTitle;
var EE = require('events').EventEmitter;
var ee = new EE();

module.exports = function(app) {

  app.controller('EnvironmentDetailsController', environmentDetailsController);

  environmentDetailsController.$inject = ['$scope', '$http', 'paginationConfig', '$routeParams'];

  function environmentDetailsController($scope, $http, paginationConfig, $routeParams) {
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
      $http.get('http://localhost:8080/environments/search/findByKey?key=' + $routeParams.key)
        .then(successHandler, errorHandler);
    })();
    
    $scope.model.serviceInstances = {
      currentPage: 1,
      pageSelected: function() {
        
        ee.on('si', function() {
          (function getServiceInstances(pageNumber) {
            $scope.serviceInstanceListStatus = 'loading';
            var apiPageNumber = pageNumber - 1;
            var query = '?projection=serviceServiceInstances&page=' + apiPageNumber + '&size=' + paginationConfig.itemsPerPage + '&sort=key';

            var siRequest = {
                method: 'GET',
                url: siUrl + query,
                headers: { 'Accept': 'application/hal+json' }
            };
            var siSuccessHandler = function(data) {
              console.log(data);
              var siPage = data;
              $scope.serviceInstances = siPage._embedded.serviceInstances;
              $scope.serviceInstanceMetadata = siPage.metadata;
              $scope.serviceInstanceListStatus = 'loaded';
            };
            $http(siRequest)
                .success(siSuccessHandler)
                .error(function() { $scope.serviceInstanceListStatus = 'error'; });
          })($scope.model.serviceInstances.currentPage);          
        });
      }
    };
    
    $scope.model.serviceInstances.pageSelected();
  }
};
