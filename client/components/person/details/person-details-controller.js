module.exports = function(app) {

  app.controller('PersonDetailsController', PersonDetailsController);

  /* @ngInject */
  function PersonDetailsController(dataService, $stateParams, Page) {
    var vm = this;

    dataService.get('/persons/search/findByUsername?username=' + $stateParams.username)
      .then(successHandler, errorHandler);

    function successHandler(res) {
      vm.person = res.data;
      vm.person.firstNameLastName = displayName(res.data);
      Page.setTitle(vm.person.firstNameLastName);
      
      dataService.get(res.data._links.directReports.href)
        .then(function(res) {

          vm.person.directReports = res.data._embedded.persons;
          for (var i = 0; i < vm.person.directReports.length; i++) {
            vm.person.directReports[i].displayName = displayName(vm.person.directReports[i]);
          }
        }, errorHandler);
      dataService.get(res.data._links.manager.href)
        .then(function(res) {
          vm.person.manager = res.data;
          vm.person.manager.displayName = displayName(vm.person.manager);
        }, function(res) {
          if (res.status === 404) {
            vm.person.manager = null;
          } else {
            return;
          }
        });
    }

    function errorHandler(res) {
      return console.log(res);
    }

    // TODO: Previously was on $rootScope and leaving here for now. Move to a service. [IDM]
    function displayName(person) {
      return !person.displayName ? person.firstName + ' ' + person.lastName : person.displayName;
    }
  }
};