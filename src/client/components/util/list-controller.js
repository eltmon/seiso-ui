var pageTitle = require('./util').pageTitle;

module.exports = function(app, title, path) {

  // No need to inject here since we're returning the injection
  function ListController($scope, v2Api) {
    $scope.listStatus = 'loading';
    $scope.model.page.title = pageTitle(title);
    var successHandler = function(data) {
      $scope.items = data._embedded.items;
      $scope.listStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.listStatus = 'error';
    };
    v2Api.get(path, successHandler, errorHandler);
  }

  return ['$scope', 'v2Api', ListController];
};
