var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {

  app.controller('MachineDetailsController', MachineDetailsController);

  /* @ngInject */
  function MachineDetailsController($scope, dataService, $stateParams) {
    dataService.get('/machines/search/findByName?name=' + $stateParams.name)
      .then(function(res) {
        $scope.machine = res.data;
        $scope.model.page.title = pageTitle(res.data.name);
        var nodesHref = res.data._links.nodes.href;
        dataService.get(nodesHref)
          .then(function(res) {
            $scope.nodes = res.data._embedded.nodes;

          });
      });
  }
};
