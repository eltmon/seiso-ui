module.exports = function(app) {

  app.controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($http, dataService, Page, AuthService) {

    Page.setTitle('Home');
    var vm = this;
    vm.serviceStatus = 'loading';

    dataService.get('/serviceGroups')
      .then(successHandler, function(err) { return console.log(err);});

    function successHandler(res) {
      AuthService.checkAuthentication(res);
      var serviceGroups = res.data._embedded.serviceGroups;
      var serviceGroupsMap = {};
      
      serviceGroups.push({ 'key' : '_ungrouped', 'name' : 'Ungrouped' });
      serviceGroups.forEach(function(group) {
        group.services = [];
        serviceGroupsMap[group.key] = group;
      });
      
      vm.serviceGroups = serviceGroupsMap;
      vm.serviceStatus = 'loaded';
    }
    vm.getServices = function(group) {
      // services for this group are already loaded
      if (vm.serviceGroups[group.key].services.length > 0) {
        return;
      }
      group.status = 'loading';

      dataService.get(group._links.services.href)
        .then(function(res) {
          vm.serviceGroups[group.key].services = res.data._embedded.services.sort(alphaSort); 
          group.status = 'loaded';
        }, function(err) {
          if (err) return console.log(err);
      });
    };

    function alphaSort(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }
  }
};
