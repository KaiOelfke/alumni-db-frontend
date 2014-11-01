'use strict';

/**
 * @ngdoc overview
 * @name alumniDbFrontendApp
 * @description
 * # alumniDbFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('alumniDbFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
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
      .otherwise({
        redirectTo: '/'
      });
  });
