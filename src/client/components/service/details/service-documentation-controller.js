module.exports = function(app) {

  app.controller('ServiceDocumentationController', serviceDocumentationController);

  serviceDocumentationController.$inject = ['$scope', '$http', '$routeParams'];

  function serviceDocumentationController($scope, $http, $routeParams) {
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
