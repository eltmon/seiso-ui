module.exports = function(app) {

  app.controller('ServiceDetailsController', ServiceDetailsController);

  /* @ngInject */
  function ServiceDetailsController($scope, $stateParams, dataService, Page) {
    $scope.vm = this;
    $scope.vm.serviceStatus = 'loading';
    $scope.vm.viewing = $stateParams.key;
    var path = '/services/search/findByKey?key=' + $stateParams.key + '&projection=serviceDetails';

    dataService.get(path)
      .then(successHandler, errorHandler);

    function successHandler(res) {
      var service = res.data;
      Page.setTitle(res.data.name);

      $scope.vm.service = service;
      $scope.service = service;
      $scope.vm.serviceGroup = res.data.group;
      $scope.vm.serviceType = res.data.type;
      $scope.vm.serviceOwner = res.data.owner;
      $scope.vm.docLinks = res.data.docLinks;
      console.log($scope.vm.docLinks);
      $scope.vm.serviceInstances = res.data.serviceInstances;
      $scope.vm.serviceStatus = 'loaded';
    }

    function errorHandler() {
      $scope.vm.serviceStatus = 'error';
    }

  }
};
