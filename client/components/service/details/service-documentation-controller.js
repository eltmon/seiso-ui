module.exports = function(app) {

  app.controller('ServiceDocumentationController', serviceDocumentationController);

  /* @ngInject */
  function serviceDocumentationController($scope, dataService, $stateParams) {
    var vm = this;
    vm.serviceDocumentationStatus = 'loading';
    vm.docLinks = [];
    
    $scope.$watch('service', function(newVal, oldVal) {
      if (!newVal) return;
      if (!$scope.service.docLinks) {
        vm.serviceDocumentationStatus = 'error';
      } else {
        vm.docLinks = $scope.service.docLinks;
        vm.serviceDocumentationStatus = 'loaded';
      }      
    });
  }
};
