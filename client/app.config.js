module.exports = function(app) {
  app.config(AppConfig);

  /* @ngInject */
  function AppConfig($httpProvider, paginationConfig) {
    $httpProvider.defaults.headers.common = {
      Accept: 'application/hal+json, application/json'
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
