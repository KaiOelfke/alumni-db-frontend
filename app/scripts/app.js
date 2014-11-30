'use strict';

/**
 * @ngdoc overview
 * @name alumniWebApp
 * @description
 * # alumniWebApp
 *
 * Main module of the application.
 */
angular
  .module('alumniWebApp', [
    'AppConfig',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ng-token-auth'
  ])
  .config(function($authProvider,API_HOST) {
    $authProvider.configure({
        apiUrl: API_HOST
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })      
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  ;
