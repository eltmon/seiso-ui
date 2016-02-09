module.exports = function(app) {

  app.controller('MachineDetailsController', MachineDetailsController);

  /* @ngInject */
  function MachineDetailsController($scope, dataService, $stateParams, Page) {
    dataService.get('/machines/search/findByName?name=' + $stateParams.name)
      .then(function(res) {
        $scope.machine = res.data;
        Page.setTitle(res.data.name);
        var nodesHref = res.data._links.nodes.href;
        dataService.get(nodesHref)
          .then(function(res) {
            $scope.nodes = res.data._embedded.nodes;
          });
      });
  }
};
