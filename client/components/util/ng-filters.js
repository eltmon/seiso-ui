var breakPathsFilter = function() {
  return function(path) {
    if (typeof path === 'undefined') {
      return null;
    } else {
      // &#8203; is a zero-width space.
      return (path === null ? null : path.replace(/\:/g, '&#8203;:').replace(/\//g, '&#8203;/'));
    }
  };
};

var breakPackagesFilter = function() {
  return function(path) {
    if (typeof path === 'undefined') {
      return null;
    } else {
      // &#8203; is a zero-width space.
      return (path === null ? null : path.replace(/\./g, '&#8203;.').replace(/\$/g, '&#8203;$'));
    }
  };
};

// Register filters
module.exports = function(app) {
  app.module('seisoFilters', [])
    .filter('breakPaths', breakPathsFilter)
    .filter('breakPackages', breakPackagesFilter);
};
