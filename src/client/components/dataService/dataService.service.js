module.exports = function(app) {
  app.factory('DataService', DataService);

  DataService.$inject = ['$http', '$log'];

  function DataService($http, $log) {
    $log.info('Creating DataService');

    function findServices() {
      // FIXME Hardcode
      return $http.get('http://localhost:8080/services');
    }
    
    var service = {
      findServices: findServices
    };
    return service;
  }
};
