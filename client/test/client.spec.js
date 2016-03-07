'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

describe('seiso-ui', function() {
  
  it('should be able to run tests', function(done) {
    expect(true).to.equal(true);
    expect(1).to.equal(1);
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

    it('should be able to create a controller', function() {
      var homeController = $ControllerConstructor('HomeController as vm', {$scope: $scope});
      expect(typeof homeController).to.equal('object');
      expect($scope.vm.serviceStatus).to.equal('loading');
      expect(typeof $scope.vm.getServices).to.equal('function');
    });
  });
});
