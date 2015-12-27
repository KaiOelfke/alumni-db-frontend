'use strict';

describe('Controller: SigninCtrl', function() {

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

  // Ignore view requests and transition to 'guest.signin' state
  beforeEach(function() {

    // First url is always '' which is why the initial state is 'home'.
    $httpBackend.whenGET('views/home.html').respond(200, '');

    // Since the user is not allowed to go to 'home', the next url will
    // be '/' (not sure why) which resolves to the state 'home.start-page'.
    $httpBackend.whenGET('views/users.html').respond(200, '');

    // That is of corse also not allowed. We trigger a state transition to
    // 'guest.signin' which is why we land in 'guest' and 'splash.html'
    // is requested.
    $httpBackend.whenGET('views/splash.html').respond(200, '');

    // After that, the next state is 'guest.signin' where 'splash-signin.html'
    // is requested. We should check if this is the order of requests we expect.
    $httpBackend.whenGET('views/splash-signin.html').respond(200, '');

    // Flush all possible view requests before each test
    $httpBackend.flush();

    // Transition to signin state
    $state.go('guest.signin');

    // If a user who has not completed profile signs in, we redirect him
    // to the state 'home.registration'.
    $httpBackend.whenGET('views/home-registration/main.html').respond(200, '');
  });

  // Create new scope and compile minimal form element
  beforeEach(function() {
    scope = $rootScope.$new();
    ctrl = $controller('SigninCtrl', {
      $scope: scope
    });
    form = '<form name="signinForm">' +
      '<input type="email" name="email" ng-model="signinData.email" required/>' +
      '<input type="password" name="password" ng-model="signinData.password" required/>' +
      '</form>';
    $compile(form)(scope);
    form = scope.signinForm;
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
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
    form.password.$setViewValue('');
    expect(form.password.$pristine).toBeFalsy();
    expect(form.password.$valid).toBeFalsy();
    form.password.$setViewValue('12345678');
    expect(form.password.$valid).toBeTruthy();
  });

  it('should have form validity checks', function() {
    // Empty forms are valid by default. We should make sure the
    // user should not be able to submit empty forms by disabling
    // the submit button for example.
    expect(form.$valid).toBeTruthy();
    form.email.$setViewValue('');
    form.password.$setViewValue('');
    expect(form.$valid).toBeFalsy();
    form.email.$setViewValue('max.mustermann@gmail.com');
    expect(form.$valid).toBeFalsy();
    form.password.$setViewValue('12345678');
    expect(form.$valid).toBeTruthy();
  });

  it('should not post invalid data', function() {
    form.email.$setViewValue('');
    form.password.$setViewValue('');
    expect(form.$valid).toBeFalsy();
    scope.handleSignInBtnClick(scope.signinData);
    form.email.$setViewValue('bad.hacker@gmail.com');
    expect(form.$valid).toBeFalsy();
    scope.handleSignInBtnClick(scope.signinData);
  });

  it('should handle post with valid data of non-user correctly', function() {
    form.email.$setViewValue('bad.hacker@gmail.com');
    form.password.$setViewValue('12345678');
    expect(form.$valid).toBeTruthy();
    scope.handleSignInBtnClick(scope.signinData);
    $httpBackend.expectPOST(backendBase + '/auth/sign_in').respond(function(method, url, data) {
      expect(JSON.parse(data)).toEqual(scope.signinData);
      return [401, '{}', '{}']; // user not found
    });

    $httpBackend.flush();
    expect($state.current.name).toEqual('guest.signin');
  });

  it('should handle post with valid data of user with completed profile correctly', function() {
    form.email.$setViewValue('max.mustermann@gmail.com');
    form.password.$setViewValue('12345678');
    expect(form.$valid).toBeTruthy();
    scope.handleSignInBtnClick(scope.signinData);
    $httpBackend.expectPOST(backendBase + '/auth/sign_in').respond(function(method, url, data) {
      expect(JSON.parse(data)).toEqual(scope.signinData);
      var shortUserModel = '{' +
        '"data": {' +
          '"id": 1,' +
          '"email": "max.mustermann@gmail.com",' +
          '"first_name": "Max",' +
          '"last_name": "Mustermann",' +
          '"provider": "email",' +
          '"uid": "max.mustermann@gmail.com",' +
          '"registered": true,' +
          '"confirmed_email": null,' +
          '"completed_profile": true,' +
          '"is_super_user": false,' +
          '"customer_id": ""' +
        '}' +
      '}';
      return [200, shortUserModel, '{}']; // user not found
    });

    $httpBackend.flush();
    expect($state.current.name).toEqual('home.start-page');
  });

  it('should handle post with valid data of user without completed profile correctly', function() {
    form.email.$setViewValue('max.mustermann@gmail.com');
    form.password.$setViewValue('12345678');
    expect(form.$valid).toBeTruthy();
    scope.handleSignInBtnClick(scope.signinData);
    $httpBackend.expectPOST(backendBase + '/auth/sign_in').respond(function(method, url, data) {
      expect(JSON.parse(data)).toEqual(scope.signinData);
      var shortUserModel = '{' +
        '"data": {' +
          '"id": 1,' +
          '"email": "max.mustermann@gmail.com",' +
          '"first_name": "Max",' +
          '"last_name": "Mustermann",' +
          '"provider": "email",' +
          '"uid": "max.mustermann@gmail.com",' +
          '"registered": true,' +
          '"confirmed_email": null,' +
          '"completed_profile": false,' +
          '"is_super_user": false,' +
          '"customer_id": ""' +
        '}' +
      '}';
      return [200, shortUserModel, '{}']; // user not found
    });

    $httpBackend.flush();
    expect($state.current.name).toEqual('home.registration');
  });

});
