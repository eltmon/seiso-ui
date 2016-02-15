module.exports = function(app) {
  app.controller('SearchResultsController', SearchResultsController);

  /* @ngInject */
  function SearchResultsController($scope, SearchService, Page) {
    Page.setTitle('Search Results');
    var vm = this;
    vm.searchService = SearchService;
    vm.searchResults = SearchService.getResults()['value'];

    // Watch the values in the SearchService to change and propogate to this controller.
    $scope.$watch(function() { return SearchService.getResults()['value']; }, function(newValue, oldValue) {
      vm.searchResults = newValue;
    });
  }
};
