module.exports = function(title, name, projection, sortKey) {
  return PagingController;

  /* @ngInject */
  function PagingController(dataService, paginationConfig, $log, Page) {
    $log.debug('Entered PagingController');

    var vm = this;

    vm.pageSelected = loadPage;
    vm.query = {
      pageNumber: 1,
      pageSize: paginationConfig.itemsPerPage,
      sort: sortKey
    };
    Page.setTitle(title)

    loadPage();

    function loadPage() {
      var apiPageNumber = vm.query.pageNumber - 1;
      //FIXME: Handing optional projections here. Is the controller a good place to define the projection? [IDM]
      projection = (projection === null) ? projection = '' : projection = '&projection=' + projection;
      
      var path = '/' + name +
            '?page=' + apiPageNumber +
            '&size=' + vm.query.pageSize +
            '&sort=' + vm.query.sort +
            projection;

      vm.loadStatus = 'loading';

      dataService.get(path).then(success, error);

      function success(response) {
        console.log(response);
        $log.debug('Loaded data');
        vm.loadStatus = 'loaded';
        vm.page = response.data.page;
        // FIXME Handle no-items case [WLW]
        vm.page.lowerIndex = vm.page.number * vm.page.size + 1;
        vm.page.upperIndex = Math.min(vm.page.totalElements, (vm.page.number + 1) * vm.page.size);
        vm.items = response.data._embedded[name];
      }

      function error(response) {
        $log.error('Error loading data: ' + JSON.stringify(response));
        vm.loadStatus = 'error';
      }
    }
  }
};
