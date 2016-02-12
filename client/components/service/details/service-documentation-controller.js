module.exports = function(app) {

  app.controller('ServiceDocumentationController', serviceDocumentationController);

  /* @ngInject */
  function serviceDocumentationController($scope, $http, $stateParams) {
    $scope.serviceDocumentationStatus = 'loading';
    
    $scope.$on('onService', function(event) {
      if (!event.targetScope.docLinks) {
        $scope.serviceDocumentationStatus = 'error';
        return;
      }
      $scope.docLinks = event.targetScope.docLinks;
      $scope.serviceDocumentationStatus = 'loaded';
    });
  
  }
};
