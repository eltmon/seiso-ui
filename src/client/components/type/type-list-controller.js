var ListController = require('../util/paging-controller');
var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {
  app.controller('TypeListController', TypeListController);

  /*@ngInject*/
  function TypeListController($scope, DataService, paginationConfig) {
    $scope.model.page.title = pageTitle('Types');
    var path = '/serviceTypes';
    var ServiceTypes = new DataService(path);
    var successHandler = function(res, status, headers) {
      $scope.items = res.data._embedded.serviceTypes;
    };

    ServiceTypes.get(function(err, res) {
      if (err) return console.log(err);
      successHandler(res);
    });
  }
};
