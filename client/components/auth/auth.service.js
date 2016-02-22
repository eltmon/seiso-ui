  
module.exports = function(app) {
  
  app.factory('AuthService', AuthService);

  /* @ngInject */
  function AuthService( $http, $location, $cookies) {
    var authenticated, 
        isAnonymous, 
        hasAdminRole,
        authorities;

    var checkAuthentication = function(login) {
      console.log('Checking authentication');
      $http.get('/login')
        .success(successHandler)
        .error(errorHandler);
      function successHandler(data) {
        console.log('login response');
        console.log('Authenticated: ' + authenticated);
        console.log('res: ', data);
      }
      function errorHandler() {
        console.log('Authentication check failed');
        authenticated = false;
      };

    };

    return {

      checkAuthentication: checkAuthentication,

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
        var successHandler = function() {
          console.log('Logged out');
          authenticated = false;
          $location.path('//');
        };
        var errorHandler = function(data) {
          // TODO Is this the right thing to do here?
          // Can't really assume that the user is logged out.
          authenticated = false;
        };
        $http.post('logout', {})
            .success(successHandler)
            .error(errorHandler);
      }
    };
  }
};
