var ListController = require('../util/paging-controller');
var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {
  app.controller('TypeListController', TypeListController);

  /* @ngInject */
  function TypeListController($scope, dataService, paginationConfig) {
    $scope.model.page.title = pageTitle('Types');
    var path = '/serviceTypes';

    dataService.get(path).then(successHandler, errorHandler);

    var successHandler = function(res, status, headers) {
      $scope.items = res.data._embedded.serviceTypes;
    };

    var errorHandler = function(err) {
      $scope.errors = [];
      $scope.errors.push(err);
    };

  }
};
