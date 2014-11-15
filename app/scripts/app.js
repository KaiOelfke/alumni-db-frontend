'use strict';

/**
 * @ngdoc overview
 * @name alumni-db-frontend
 * @description
 * # alumni-db-frontend
 *
 * Main module of the application.
 */

function HeaderCtrl($scope, $location) {
  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };
}

angular
  .module('alumni-db-frontend', [
    'AppConfig',
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
  .controller('HeaderCtrl', HeaderCtrl);
