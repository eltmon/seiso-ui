var pageTitle = require('../util/util').pageTitle;

module.exports = function(app) {

  app.controller('StatusListController', StatusListController);
  
  /*@ngInject*/
  function StatusListController($scope, DataService) {
    $scope.model.page.title = pageTitle('Statuses');

    var StatusTypes = new DataService('/statusTypes');
    StatusTypes.get(function(err, res) {
      if (err) return console.log(err);
      $scope.statusTypes = res.data._embedded.statusTypes;
    })
    var HealthStatuses = new DataService('/healthStatus');
    HealthStatuses.get(function(err, res) {
      if (err) return console.log(err);
      $scope.healthStatuses = res.data._embedded.healthStatuses;
    })
    var RotationStatuses = new DataService('/rotationStatuses');
    RotationStatuses.get(function(err, res) {
      if (err) return console.log(err);
      $scope.rotationStatuses = res.data._embedded.rotationStatuses;
    });
  }
};