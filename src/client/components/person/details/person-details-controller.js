var pageTitle = require('../../util/util').pageTitle;

module.exports = function(app) {

  app.controller('PersonDetailsController', PersonDetailsController);

  /*@ngInject*/
  function PersonDetailsController($scope, DataService, $routeParams) {
    var Person = new DataService('/persons/search/findByUsername?username=' + $routeParams.username);
    var successHandler = function(res) {
      $scope.person = res.data;
      $scope.person.firstNameLastName = $scope.displayName(res.data);
      $scope.model.page.title = pageTitle($scope.person.firstNameLastName);

      var DirectReports = new DataService(res.data._links.directReports.href);
      var Manager = new DataService(res.data._links.manager.href);
      
      DirectReports.get(function(err, res) {
        if (err) return console.log(err);
        $scope.person.directReports = res.data._embedded.persons;
        for (var i = 0; i < $scope.person.directReports.length; i++) {
          $scope.person.directReports[i].displayName = $scope.displayName($scope.person.directReports[i]);
        }
      });
      Manager.get(function(err, res) {
        if (err) return console.log(err);
        $scope.person.manager = res.data;
        $scope.person.manager.displayName = $scope.displayName($scope.person.manager);
      });
    };
    Person.get(function(err, res) {
      if (err) return console.log(err);
      successHandler(res);
    });
  }
};