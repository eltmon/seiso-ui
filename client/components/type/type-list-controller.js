var ListController = require('../util/paging-controller');

module.exports = function(app) {
  app.controller('TypeListController', TypeListController);

  /* @ngInject */
  function TypeListController($scope, dataService, paginationConfig, Page) {
    Page.setTitle('Types');

    dataService.get('/serviceTypes')
      .then(successHandler, errorHandler);

    function successHandler(res) {
      console.log(res);
      $scope.items = res.data._embedded.serviceTypes;
    }

    function errorHandler(err) {
      $scope.errors = [];
      $scope.errors.push(err);
    }
  }
};
