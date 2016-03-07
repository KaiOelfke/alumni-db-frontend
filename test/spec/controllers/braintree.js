'use strict';

describe('Controller: braintreeCtrl', function() {

  var $state;
  var $httpBackend;
  var $controller;
  var $rootScope;
  var $compile;
  var scope;
  var ctrl;
  var form;
  var backendBase = 'http://localhost:3000';

  beforeEach(module('alumni-db-frontend'));

  beforeEach(inject(function($injector) {
    $state = $injector.get('$state');
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  // Ignore view requests
  beforeEach(function() {
    $httpBackend.whenGET('views/splash.html').respond(200, '');
    $httpBackend.whenGET('views/splash-signin.html').respond(200, '');
    $httpBackend.flush();
    $state.go('home.braintree');
  });

  // Create new scope and compile minimal form element
  beforeEach(function() {
    scope = $rootScope.$new();
    ctrl = $controller('SigninCtrl', {
      $scope: scope
    });
    form = '<form>' +
      '<div id="payment-form"></div>' +
      '<input type="submit" value="Pay {{ defaultPlan.price }} €" ng-show="braintreeReady">' +
      '</form>';
    $compile(form)(scope);
    form = scope.signinForm;
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should use the braintree controller', function() {
    expect($state.current.controller).toEqual('braintreeCtrl');

  });

});
