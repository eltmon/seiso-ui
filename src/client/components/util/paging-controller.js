var pageTitle = require('./util').pageTitle;

module.exports = function(title, name, sortKey) {
  return PagingController;

  /* @ngInject */
  function PagingController(dataService, paginationConfig, $log) {
    $log.debug('Entered PagingController');

    var vm = this;

    vm.pageSelected = loadPage;
    vm.query = {
      pageNumber: 1,
      pageSize: paginationConfig.itemsPerPage,
      sort: sortKey
    };
    vm.title = pageTitle(title);

    loadPage();

    function loadPage() {
      var apiPageNumber = vm.query.pageNumber - 1;
      var path = '/' + name
          + '?page=' + apiPageNumber
          + '&size=' + vm.query.pageSize
          + '&sort=' + vm.query.sort;

      dataService.get(path).then(success, error);

      function success(response) {
        $log.debug('Loaded page');
        // FIXME Handle no-items case [WLW]
        vm.page = response.data.page;
        vm.page.lowerIndex = vm.page.number * vm.page.size + 1;
        vm.page.upperIndex = Math.min(vm.page.totalElements, (vm.page.number + 1) * vm.page.size);
        vm.items = response.data._embedded[name];
      }

      function error(response) {
        $log.error('Error loading page: ' + JSON.stringify(response));
      }
    }
  }
};
