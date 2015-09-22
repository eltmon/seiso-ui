
exports.route = function(controllerName, viewName) {
	return {
		controller: controllerName + 'Controller',
		templateUrl: 'view/' + viewName + '.html'
	};
};

exports.viewRoute = function(shortViewName) {
	return {
		templateUrl: "view/" + shortViewName + ".html"
	};
};

exports.pageTitle = function(baseTitle) {
	return baseTitle + " - Seiso";
};
