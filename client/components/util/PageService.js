module.exports = function(app) {
  app.factory('Page', PageService);

  function PageService() {

    var title = 'Home';

    return {
      title: function() { return fullTitle(title); },
      setTitle: function(newTitle) { title = newTitle; }
    };

    function fullTitle(title) {
      return title + ' - Seiso';
    }
  }
};
