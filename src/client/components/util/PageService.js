module.exports = function(app) {
  app.factory('Page', PageService);

  function PageService() {

    return {
      title: function() { return fullTitle(title); },
      setTitle: function(newTitle) { title = newTitle; }
    }

    var title = 'Home';

    function fullTitle(title) {
      return title + ' - Seiso';
    }
  }
};
