module.exports = function(app) {

  app.controller('ServiceDetailsController', ServiceDetailsController);

  /* @ngInject */
  function ServiceDetailsController($scope, $stateParams, dataService, Page) {
    var vm = this;
    vm.serviceStatus = 'loading';
    vm.viewing = $stateParams.key;
    var path = '/services/search/findByKey?key=' + $stateParams.key + '&projection=serviceDetails';

    dataService.get(path)
      .then(successHandler, errorHandler);

    function successHandler(res) {
      var service = res.data;
      Page.setTitle(res.data.name);

      vm.service = service;
      vm.serviceGroup = res.data.group;
      vm.serviceType = res.data.type;
      vm.serviceOwner = res.data.owner;
      vm.docLinks = res.data.docLinks;
      vm.serviceInstances = res.data.serviceInstances;

      // INFO: Since we have to broadcast changes to child components, we're using $scope here. The vm that's set
      // here is accessible in a child component via event.targetScope.vm. Not sure if mixing the controllerAS
      // functionality and $scope is an antipattern or not. [IDM]
      $scope.$broadcast('onService');
      vm.serviceStatus = 'loaded';
    }
    function errorHandler() {
      vm.serviceStatus = 'error';
    }

  }
};
