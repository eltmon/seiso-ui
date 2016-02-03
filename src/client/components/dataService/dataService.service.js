module.exports = function(app) {
  app.factory('dataService', dataService);

  /* @ngInject */
  function dataService($http, $log) {
    var API_BASE_URL;
    var BASE_URL;
    var FULL_URL_REGEX = /https?:\/\//;

    // Get the api endpoint for this service to interact with
    $http.get('/getApiConfig')
      .then(function(res) {
        BASE_URL = res.data.apiEndpoint;
        API_BASE_URL = res.data.apiEndpoint;
      }, function(res) {
        return console.log('err: ', res);
      });

    return {
      get: get,
      getBaseUrl: function() {
        return BASE_URL;
      }
    };

    // Returning promises here so components can attach to them (e.g. automatically
    // show progress bars til the promise is fulfilled, like md-data-table does).
    function get(url) {
      return $http.get(resolve(url));
    }

    // Allow for optionally passing a full URL instead of a resource endpoint
    function resolve(url) {
      return FULL_URL_REGEX.test(url) ? url : API_BASE_URL + url;      
    }
  }
};
