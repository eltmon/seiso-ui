var pageTitle = require('./util').pageTitle;

module.exports = function(app) {
  app.controller('SearchController', SearchController);

  /* @ngInject */
  function SearchController($rootScope, $scope, SearchService, $location) {
    $scope.model.page.title = pageTitle('Search Results');
    $scope.searchService = SearchService;
    $scope.searchQuery = SearchService.getQuery();
    $scope.searchResults = SearchService.getResults();
    $scope.search = function() {
      SearchService.search(function() { 
        var searchResults = SearchService.getResults()['value'];
        $rootScope.searchResults = searchResults;
        $location.path('/search');
      });
    };
  }
};
