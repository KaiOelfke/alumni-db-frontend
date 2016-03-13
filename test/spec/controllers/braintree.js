'use strict';

describe('Controller: braintreeCtrl', function() {

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
  });

  // Inject braintree controller and compile braintree dropin
  beforeEach(function() {
    scope = $rootScope.$new();
    ctrl = $controller('braintreeCtrl', {
      $scope: scope
    });
    form = '<form>' +
      '<div id="payment-form"></div>' +
      '<input type="submit" value="Pay {{ defaultPlan.price }} €" ng-show="braintreeReady">' +
      '</form>';
    $compile(form)(scope);
  });

  // expect braintree request to the backend
  beforeEach(function() {
    $httpBackend.whenGET(backendBase + '/subscriptions/plans').respond(
      200,
      '[{"id":1,"name":"default plan","price":25,"default":true,"description":"","delete_flag":false}]'
    );
    $httpBackend.whenGET(backendBase + '/subscriptions/client_token').respond(
      200,
      '{"clientToken": "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJkMmFhNGU2ZmQ1ZTE4YjI0MjczODY2OTBjNzNlNmE2ZTc3ZDMyMzQyYTA0NjZjYTQ1Nzg1ZGQ5ZjI1MDRiMzA4fGNyZWF0ZWRfYXQ9MjAxNi0wMy0wN1QxNzowMzo0Mi43NDkwNjMwMTMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0="}'
    );
    $httpBackend.flush();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a title defined', function() {
    expect(scope.title).toBeDefined();
  });

  it('should have received at least one plan', function() {
    expect(scope.plans).toBeDefined();
    expect(scope.plans.length >= 1).toBeTruthy();
  });

  it('should have one default plan', function() {
    expect(scope.defaultPlan).toBeDefined();
    expect(scope.defaultPlan.default).toBeTruthy();
    expect(scope.defaultPlan.price).not.toBeLessThan(0);
  });

  xit('should initialize braintree dopin', function() {
    expect(scope.braintreeReady).toBeTruthy();
  });

  // it should not initialize dropin with invalid token

});
