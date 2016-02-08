var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {
  app.controller('SearchController', SearchController);

  /* @ngInject */
  function SearchController($scope, SearchService, $location) {
    $scope.searchQuery;
    $scope.search = function() {
      SearchService.setQuery($scope.searchQuery);
      SearchService.search(function() {
        $location.path('/search-results');
      });
    };
  }
};
