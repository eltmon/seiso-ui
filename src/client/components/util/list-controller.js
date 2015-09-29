var pageTitle = require('./util').pageTitle;

module.exports = function(app, title, path) {

  function ListController($scope, $http) {
    console.log('list controller');
    $scope.listStatus = 'loading';
    $scope.model.page.title = pageTitle(title);
    var successHandler = function(data) {
      console.log(data);
      $scope.items = data._embedded.items;
      $scope.listStatus = 'loaded';
    };
    var errorHandler = function() {
      $scope.listStatus = 'error';
    };
    $http.get(path).then(successHandler, errorHandler);
  }

  return ['$scope', 'v2Api', ListController];
};
