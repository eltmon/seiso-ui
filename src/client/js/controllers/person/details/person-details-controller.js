module.exports = function(app) {

	app.controller('personDetailsController', personDetailsController);

	personDetailsController.$inject = ['$scope', '$http', '$routeParams'];

	function personDetailsController($scope, $http, $routeParams) {
		var successHandler = function(data) {
			var fullName = $scope.displayName(data);
			$scope.model.page.title = pageTitle(fullName);
			$scope.person = data;
			$scope.person.firstNameLastName = fullName;
		};
		$http.get('/v2/people/' + $routeParams.username, { headers: { 'Accept': 'application/hal+json' } })
				.success(successHandler)
				.error(function() { alert('Error while getting person.'); })
	}
};