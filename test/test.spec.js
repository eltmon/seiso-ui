'use strict';

require('../static/js/build.bundle.js');

// require('../node_modules/angular-mocks/angular-mocks.js')

describe('seiso-ui', function() {
  
  it('should be able to run tests', function testOne(done) {
    expect(true).toBe(true);
    expect(1).toBeTruthy();
    done();
  });

    it('should be able to run tests', function testOne(done) {
    expect(true).toBe(true);
    expect(1).toBeTruthy();
    done();
  });

  describe('controller-test', function() {
    var $ControllerConstructor,
        $httpBackend,
        $scope;

    beforeEach(angular.mock.module('seiso'));
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $ControllerConstructor = $controller;
    }));

    it('should be able to create a controller', function testTwo() {
      var homeController = $ControllerConstructor('HomeController as vm', {$scope: $scope});
      expect(typeof homeController).toBe('object');
      expect($scope.vm.serviceStatus).toBe('loading');
      expect(typeof $scope.vm.getServices).toBe('function');
    });
  });
});
