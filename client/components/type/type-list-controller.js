var ListController = require('../util/paging-controller');

module.exports = function(app) {
  app.controller('TypeListController', TypeListController);

  /* @ngInject */
  function TypeListController(dataService, paginationConfig, Page) {
    var vm = this;
    Page.setTitle('Types');

    dataService.get('/serviceTypes')
      .then(successHandler, errorHandler);

    function successHandler(res) {
      console.log(res);
      vm.items = res.data._embedded.serviceTypes;
    }

    function errorHandler(err) {
      vm.errors = [];
      vm.errors.push(err);
    }
  }
};
