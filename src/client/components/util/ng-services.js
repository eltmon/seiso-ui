// TODO Take a look at $resource
// https://docs.angularjs.org/api/ngResource/service/$resource

// TODO Separate service definitions from registrations, like we do in the other modules.
module.exports = function(app) {

  
  app.module('seisoServices', [])
  // This is a service, not a factory.
  .service('SearchService', SearchService);

  /* @ngInject */
  function SearchService(dataService) {
    var baseUrl = dataService.getBaseUrl() + '/internal/search?q=';
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
      searchUrl = this.buildSearchUrl();
      dataService.get(searchUrl)
          .success(function(data) {
            results = { value : data };
            callback();
          });
    };
  }

};
