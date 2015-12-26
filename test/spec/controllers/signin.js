'use strict';

describe('Controller: SigninCtrl', function() {

  var $httpBackend;
  var $controller;
  var $rootScope;
  var $compile;
  var scope;
  var ctrl;
  var form;

  beforeEach(module('alumni-db-frontend'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    scope = $rootScope.$new();
    ctrl = $controller('SigninCtrl', {$scope: scope});
    form = '<form name="signinForm">' +
      '<input type="email" name="email" ng-model="signinData.email" required/>' +
      '<input type="password" name="password" ng-model="signinData.password" required/>' +
      '</form>';
    $compile(form)(scope);
    form = scope.signinForm;
  }));

  beforeEach(function() {
    $httpBackend.when('POST', '/auth/sign_in').respond(function(method, url, data, headers, params) {
      console.log('responding with', method, url, data, headers, params);
    });
  });

  // The controller should provide an empty object in which email and password
  // will be stored by the view.
  it('should create empty signin data object', function() {
    expect(scope.signinData).toEqual({});
  });

  // Error messages have title and descriptions. Here we make sure we receive the initial
  // error title in the correct variable which will be used by the view.
  it('should retreive initial form validation titel', function() {
    expect(scope.farmValidationTitle()).toEqual('Change a few things and try submitting again.');
  });

  // Error messages have title and descriptions. Here we make sure we receive the initial
  // error desciption in the correct variable which will be used by the view.
  it('should retreive initial form validation message', function() {
    expect(scope.formValidationMessages()).toEqual('');
  });

  it('should have an untouched form element', function() {
    expect(form.$pristine).toBeTruthy();
  });

  it('should have email validity checks', function() {
    expect(form.email.$pristine).toBeTruthy();
    form.email.$setViewValue('');
    expect(form.email.$pristine).toBeFalsy();
    expect(form.email.$valid).toBeFalsy();
    form.email.$setViewValue('max.mustermann');
    expect(form.email.$valid).toBeFalsy();
    form.email.$setViewValue('max.mustermann@');
    expect(form.email.$valid).toBeFalsy();
    form.email.$setViewValue('max.mustermann@gmail');
    expect(form.email.$valid).toBeTruthy();
    form.email.$setViewValue('max.mustermann@gmail.');
    expect(form.email.$valid).toBeFalsy();
    form.email.$setViewValue('max.mustermann@gmail.com');
    expect(form.email.$valid).toBeTruthy();
  });

  // We currently don't check if the password has a minimum length
  it('should have password validity checks', function() {
    expect(form.password.$pristine).toBeTruthy();
    form.password.$setViewValue('');
    expect(form.password.$pristine).toBeFalsy();
    expect(form.password.$valid).toBeFalsy();
    form.password.$setViewValue('abc');
    expect(form.password.$valid).toBeTruthy();
  });

  it('should check validity of required input fields', function() {
    form.$setPristine();
    // Empty forms are valid by default. We should make sure the
    // user should not be able to submit empty forms by disabling
    // the submit button for example-
    expect(form.$valid).toBeTruthy();
    form.email.$setViewValue('');
    form.password.$setViewValue('');
    expect(form.$valid).toBeFalsy();
    form.email.$setViewValue('max.mustermann@gmail.com');
    expect(form.$valid).toBeFalsy();
    form.password.$setViewValue('abc');
    expect(form.$valid).toBeTruthy();
  });

});
