module.exports = function(app) {
  app.factory('DataService', DataService);

  var seisoWebUrl = 'http://localhost:8080';
  DataService.$inject = ['$http', '$log'];

  function DataService($http, $log) {

    
    return function(path) {
      var checkIfFullUrl = /http:/,
          uri;
          
      // Allow for optionally passing a full URL instead of a resource endpoint
      if (checkIfFullUrl.test(path)) {
        uri = path;
      } else {
        uri = seisoWebUrl + path;
      }

      function handleSuccess(callback) {
        return function(data) {
          callback(null, data);
        };
      }

      function handleError(callback) {
        return function(errorData) {
          callback(errorData);
        }
      }

      var module = {
        get: function(callback) {
          $http.get(uri)
            .then(handleSuccess(callback), handleError(callback));
        }
      };

      return module;
    };
  }

};
