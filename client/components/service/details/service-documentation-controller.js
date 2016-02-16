module.exports = function(app) {

  app.controller('ServiceDocumentationController', serviceDocumentationController);

  /* @ngInject */
  function serviceDocumentationController($scope, $http, $stateParams) {
    var vm = this;
    vm.serviceDocumentationStatus = 'loading';
    
    $scope.$on('onService', function(event) {
      if (!event.targetScope.vm.docLinks) {
        vm.serviceDocumentationStatus = 'error';
        return;
      }
      vm.docLinks = event.targetScope.vm.docLinks;
      vm.serviceDocumentationStatus = 'loaded';
    });
  }
};
