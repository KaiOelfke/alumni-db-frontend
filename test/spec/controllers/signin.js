'use strict';

describe('Controller: SigninCtrl', function() {

  var scope;

  beforeEach(module('alumni-db-frontend'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('SigninCtrl', {$scope: scope});
  }));

  it('should do nothing', function() {
    expect(true).not.toBe(false);
  });
});

describe('some test here', function() {
  it('should success', function() {
    expect(true).toBe(true);
  });
});
