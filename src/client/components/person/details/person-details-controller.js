var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('PersonDetailsController', PersonDetailsController);

  /*@ngInject*/
  function PersonDetailsController($scope, $http, $routeParams) {

    var successHandler = function(res) {
      $scope.person = res.data;
      $scope.person.firstNameLastName = $scope.displayName(res.data);
      $scope.model.page.title = pageTitle($scope.person.firstNameLastName);
      $http.get(res.data._links.directReports.href)
        .then(function(res) {
          $scope.person.directReports = res.data._embedded.persons;
          for (var i = 0; i < $scope.person.directReports.length; i++) {
            $scope.person.directReports[i].displayName = $scope.displayName($scope.person.directReports[i]);
          }
        }, function(res) {
          console.log(res);
        });
      $http.get(res.data._links.manager.href)
        .then(function(res) {
          $scope.person.manager = res.data;
          $scope.person.manager.displayName = $scope.displayName($scope.person.manager);
        }, function(res) {
          console.log(res);
        });
    };
    $http.get('http://localhost:8080/persons/search/findByUsername?username=' + $routeParams.username)
        .then(successHandler, function() { console.log('Error while getting person.'); });
  }
};