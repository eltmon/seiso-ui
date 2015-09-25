module.exports = function(app) {

  app.controller('ServiceDocumentationController', serviceDocumentationController);

  serviceDocumentationController.$inject = ['$scope', 'v2Api', '$routeParams'];

  function serviceDocumentationController($scope, v2Api, $routeParams) {
    $scope.serviceDocumentationStatus = 'loading';
    
    $scope.$on('onService', function(event) {
      $scope.service = event.targetScope.service;
      var path = $scope.service._links.docLinks.href;
      v2Api.get(path, successHandler, errorHandler);
    });
    var successHandler = function(data) {
      $scope.docLinks = data;
      $scope.serviceDocumentationStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.serviceDocumentationStatus = 'error';
    };
    
  }
};
