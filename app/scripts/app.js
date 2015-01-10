'use strict';

/**
 * @ngdoc overview
 * @name alumni-db-frontend
 * @description
 * # alumni-db-frontend
 *
 * Main module of the application.
 */


angular
  .module('alumni-db-frontend', [
    'AppConfig',
    'ngMessages',
    'ngCookies',
    'ui.router',
    'ng-token-auth'
  ])
  .config(function($authProvider,API_HOST) {
    $authProvider.configure({
        apiUrl: API_HOST
    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {


    $locationProvider.html5Mode(false);

    $urlRouterProvider
        .when('/', '/signin')
        .when('', '/signin')        
        .otherwise('/404');

    // For any unmatched url

    //console.log($stateProvider);
    $stateProvider
      .state('home', {
        abstract: true,
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state('home.registration', {
        url: '/registration',
        templateUrl: 'views/home-registration/main.html',
        controller: 'RegistrationCtrl'
      })
      .state('home.index', {
        url: '',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/splash-signin.html',
        controller: 'SigninCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/splash-signup.html',
        controller: 'SignupCtrl'
      })
      .state('404', {
        url: '/404',
        templateUrl: 'views/404.html'
      });

  });
