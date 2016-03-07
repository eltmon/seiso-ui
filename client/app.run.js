module.exports = function(app) {
  app.run(Run);

  /* @ngInject */
  function Run($rootScope, $http) {
    $rootScope.model = {

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
