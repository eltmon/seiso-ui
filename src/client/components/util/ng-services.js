// TODO Take a look at $resource
// https://docs.angularjs.org/api/ngResource/service/$resource

// TODO Separate service definitions from registrations, like we do in the other modules.
module.exports = function(app) {

  
  app.module('seisoServices', [])

  // FIXME Don't block on the response
  // Constructor function to create a service factory, which creates dependency-injected services.
  .factory('v1Api', ['$http', function($http) {
    // The object we're returning is the service.
    return {
      get: function(path) {
        // FIXME Return the promise, not the data...?
        return $http.get(path).success(function(data) { return data; });
      },
      
      // pageNumber is 0-indexed
      getPage: function(path, pageNumber, pageSize, sortKey) {
        console.log('Getting page: ' + path);
        return $http.get(path + '?page=' + pageNumber + '&size=' + pageSize + '&sort=' + sortKey);
      }
    };
  }])
  
  .factory('v2Api', ['$http', function($http) {
    return {
      get: function(path, successHandler, errorHandler) {
        var request = {
          method: 'GET',
          url: path,
          headers: { 'Accept': 'application/hal+json' }
        };
        $http(request)
          .success(successHandler)
          .error(errorHandler);
      }
    };
  }])

  // This is a service, not a factory.
  .service('SearchService', [ '$http', function($http) {
    var baseUrl = 'internal/search?q=';
    var query = {};
    var results = {};
  
    // TODO replace concat with URI template?
    this.buildSearchUrl = function() { return baseUrl + query.value; };
    this.getQuery = function() { return query; };
    this.setQuery = function(newQuery) { query = { value : newQuery }; };
    this.getResults = function() { return results; };
    this.setResults = function(newResults) { results = { value : newResults }; };
    
    this.search = function(callback) {
      this.results = {};
      var searchRequest = {
        method : 'GET',
        url : this.buildSearchUrl(),
        headers : { 'Accept' : 'application/hal+json' }
      };
      $http(searchRequest)
          .success(function(data) {
            results = { value : data };
            callback();
          });
    };
  }]);
};
