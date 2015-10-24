module.exports = function(app) {
  app.config(AppConfig);

  /* @ngInject */
  function AppConfig($httpProvider, paginationConfig) {
    $httpProvider.defaults.headers.common = {
      // TODO Migrate toward application/hal+json
      'Accept' : 'application/json',
      // https://spring.io/blog/2015/01/12/the-login-page-angular-js-and-spring-security-part-ii 
      'X-Requested-With' : 'XMLHttpRequest'
    };
    
    // Pagination configuration. Is this the right place to do this?
    paginationConfig.itemsPerPage = 50;
    paginationConfig.maxSize = 7;
    paginationConfig.boundaryLinks = true;
    paginationConfig.firstText = '«';
    paginationConfig.previousText = '‹';
    paginationConfig.nextText = '›';
    paginationConfig.lastText = '»';
  }
};
