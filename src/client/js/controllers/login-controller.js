module.exports = function(app) {
	app.controller('LoginController', loginController);

	loginController.$inject = ['$scope', 'AuthService'];

	function loginController($scope, authService) {
		$scope.credentials = {};
		$scope.login = authService.login;
	};
};
