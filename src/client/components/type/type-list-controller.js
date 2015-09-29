var ListController = require('../util/paging-controller');
var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {
  app.controller('TypeListController', TypeListController);

  /*@ngInject*/
  function TypeListController($scope, $http, paginationConfig) {
    $scope.model.page.title = pageTitle('Types');
    var path = 'http://localhost:8080/serviceTypes';
    var successHandler = function(res, status, headers) {
      $scope.items = res.data._embedded.serviceTypes;
    };

    $http.get(path)
      .then(successHandler, function() { console.log('Error while getting page.'); });
  }
};
