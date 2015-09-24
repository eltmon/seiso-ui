module.exports = function(app) {

  app.controller('ServiceDocumentationController', serviceDocumentationController);

  serviceDocumentationController.$inject = ['$scope', 'v2Api', '$routeParams'];

  function serviceDocumentationController($scope, v2Api, $routeParams) {
    $scope.serviceDocumentationStatus = 'loading';
    var path = 'http://localhost:3000/services/' + $routeParams.key + '/doc-links';
    var successHandler = function(data) {
      $scope.docLinks = data;
      $scope.serviceDocumentationStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.serviceDocumentationStatus = 'error';
    };
    v2Api.get(path, successHandler, errorHandler);
  }
};
