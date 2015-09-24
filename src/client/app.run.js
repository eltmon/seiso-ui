module.exports = function(app) {
  app.run(Run);

  /* @ngInject */
  function Run($rootScope, $http) {
    // TODO The functions here belong in a service. See
    // http://stackoverflow.com/questions/11938380/global-variables-in-angularjs/11938785#11938785
    // https://docs.angularjs.org/misc/faq ('$rootScope exists, but it can be used for evil')
    $rootScope.model = {
      page: {
        title: 'Seiso'
      }
    };
    $rootScope.uri = function(repoKey, itemKey) {
      if (!repoKey) {
        return '#/';
      } else if (!itemKey) {
        return '#/' + repoKey;
      } else {
        return '#/' + repoKey + '/' + itemKey;
      }
    };
    $rootScope.displayName = function(person) {
      // TODO Somehow the firstNameLastName thing actually works even for service owner, but since I have no idea
      // how, I'm not going to depend upon this quite yet.
      //return person.displayName == null ? person.firstNameLastName : person.displayName;
      return !person.displayName ? person.firstName + ' ' + person.lastName : person.displayName;
    };
  }
};
