  
module.exports = function(app) {
  
  app.factory('AuthService', AuthService);

  /* @ngInject */
  function AuthService($http, $location, $cookies) {
    var authenticated,
        isAnonymous,
        hasAdminRole,
        authorities;

    var checkAuthentication = function() {
      $http.get('/checkAuth')
        .then(function(res) {
          console.log('checkAuth: ', res);
          if (res.data.authenticated !== undefined) {
            if (res.data.authenticated) {
              authenticated = true;
              isAnonymous = false;
              return;
            } else {
              authenticated = false;
              isAnonymous = true;
            }
          }
        }, function(res) {
          return;
        });
    };

    return {

      checkAuthentication: checkAuthentication,

      authenticated: function() {
        return authenticated;
      },

      login: function() {
        console.log('Authenticating');
        
        $http.get('/login')
          .then(successHandler, errorHandler);

        function successHandler() {
          console.log('Auth response');
          // This just means that the request succeeded, not that authentication succeeded.
          // Whether authentication succeeded or not, /login returns an HTTP 302 redirect.
          // So we still need to check.
          checkAuthentication(true);
        }

        function errorHandler() {
          console.log('Authentication failed');
          authenticated = false;
        }
      },
      
      logout: function() {
        console.log('Logging out');
        $http.get('logout')
          .then(successHandler, errorHandler);
        function successHandler() {
          console.log('Logged out');
          authenticated = false;
          $location.path('//');
        }
        function errorHandler(data) {
          // TODO Is this the right thing to do here?
          // Can't really assume that the user is logged out.
          authenticated = false;
        }

      }
    };
  }
};
