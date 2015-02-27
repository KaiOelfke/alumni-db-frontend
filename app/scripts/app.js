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
    'ngCookies',
    'ng-token-auth',
    'ngMessages',
    'ui.router'
  ])
  .constant('USER_ROLES', {
    registered: 'registered',
    emailConfirmed: 'email_confirmed',
    profileCompleted: 'profile_completed',
    guest: 'guest'
  })
  .constant('AUTHZ_EVENTS', {
    notAuthorized: 'notAuthorized'
  })
  .config(function($authProvider,API_HOST) {

    var formatConvertar = function(response) {
                      response = response.data;
                      var statuses = [];
                      for (var i = response.statuses.length - 1; i >= 0; i--) {
                        statuses.push(response.statuses[i].kind);
                      }
                      response.statuses = statuses;
                      return response;
                    };

    $authProvider.configure({
        apiUrl: API_HOST,
        accountUpdatePath: '/users',
        storage: 'localStorage',
        handleLoginResponse: formatConvertar,
        handleAccountUpdateResponse: formatConvertar,
        handleTokenValidationResponse: formatConvertar

    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, USER_ROLES) {


    $locationProvider.html5Mode(false);

    $urlRouterProvider
        .when('/','home')
        .otherwise('/404');

    // For any unmatched url

    //console.log($stateProvider);
    $stateProvider
      .state('home', {
        url: '',
        template: '<ui-view/>',
        controller: ['$auth', '$state', function  ($auth,$state) {
            $auth.validateUser().then(function (user) {
              if (user.statuses.indexOf(USER_ROLES.profileCompleted) !== -1) {
                $state.transitionTo('home.loggedin.home' , {location:'replace'});
              }else {
                $state.transitionTo('home.loggedin.registration' , {location:'replace'});
              }
            },function () {
              if ($state.current.name.indexOf('home.guest') === -1) {
                $state.transitionTo('home.guest.signin', {location:'replace'});
              }
            });
        }]
      })
      .state('home.loggedin', {
        url: '',
        templateUrl: 'views/home.html',
        resolve: {
          authorizedRoles: function (USER_ROLES) {
            return [USER_ROLES.registered,
                    USER_ROLES.emailConfirmed,
                    USER_ROLES.profileCompleted];
          },
          authz: function  (authorizedRoles,authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.loggedin.home', {
        url: '/home',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        resolve: {
          authorizedRoles: function (USER_ROLES) {
            return USER_ROLES.profileCompleted;
          },
          authz: function  (authorizedRoles,authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.loggedin.profile-show', {
        url: '/profile/:id',
        templateUrl: 'views/show-profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          authorizedRoles: function (USER_ROLES) {
            return [USER_ROLES.registered,
                    USER_ROLES.emailConfirmed,
                    USER_ROLES.profileCompleted];
          },
          authz: function  (authorizedRoles,authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.loggedin.profile-update', {
        url: '/update',
        templateUrl: 'views/update-profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          authorizedRoles: function (USER_ROLES) {
            return [USER_ROLES.registered,
                    USER_ROLES.emailConfirmed,
                    USER_ROLES.profileCompleted];
          },
          authz: function  (authorizedRoles,authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.loggedin.registration', {
        url: '/registration',
        templateUrl: 'views/home-registration/main.html',
        controller: 'RegistrationCtrl',
        resolve: {
          notAuthorizedRoles: function (USER_ROLES) {
            return [USER_ROLES.guest,
                    USER_ROLES.profileCompleted];
          },          
          authz: function  (notAuthorizedRoles,authorizationService) {
            return authorizationService.isNotAuthorized(notAuthorizedRoles);
          }
        }
      })
      .state('home.guest', {
        url: '',
        templateUrl: 'views/splash.html',
        resolve: {
          authorizedRoles: function (USER_ROLES) {
            return USER_ROLES.guest;
          },
          authz: function ($state,authorizationService) {
            return authorizationService.isAuthorized($state.current.data);
          }
        }
      })
      .state('home.guest.signup', {
        url: '/signup',
        templateUrl: 'views/splash-signup.html',
        controller: 'SignupCtrl',
        resolve: {
          authorizedRoles: function (USER_ROLES) {
            return USER_ROLES.guest;
          },
          authz: function (authorizedRoles,authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.guest.signin', {
        url: '/signin',
        templateUrl: 'views/splash-signin.html',
        controller: 'SigninCtrl',
        resolve: {
          authorizedRoles: function (USER_ROLES) {
            return USER_ROLES.guest;
          },
          authz: function  (authorizedRoles,authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.404', {
        url: '/404',
        templateUrl: 'views/404.html'
      })
      .state('profile-show', {
        url: '/show',
        templateUrl: 'views/show-profile.html',
        controller: 'ProfileCtrl'
      })
      .state('profile-update', {
        url: '/update',
        templateUrl: 'views/update-profile.html',
        controller: 'ProfileCtrl'
      });


  }).run(function ($rootScope,$state) {
    /* $rootScope.$on('$stateChangeStart', function (event, next) {
     var authorizedRoles = next.data.authorizedRoles;

      $auth.validateUser().then(
        function () {
          if (authorizedRoles && !authorizationService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            $rootScope.$broadcast(AUTHZ_EVENTS.notAuthorized);
          }
        },
        function () {
            $rootScope.$broadcast('auth:not-loggedin');
        });
    });*/

    // debug

    $rootScope.$on('auth:registration-email-success', function() {
      $state.go('home.loggedin.registration');
    });
    $rootScope.$on('auth:email-confirmation-success', function() {
      $state.go('home.loggedin');
    });
    $rootScope.$on('auth:email-confirmation-error', function() {
    window.alert('There was an error with your registration.');
    });
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams){
      console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
    });

    $rootScope.$on('$stateChangeError',function(){
      console.log('$stateChangeError - fired when an error occurs during transition.');
      console.log(arguments);
    });

    $rootScope.$on('$stateChangeSuccess',function(event, toState){
      console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
    });

    $rootScope.$on('$viewContentLoaded',function(event){
      console.log('$viewContentLoaded - fired after dom rendered',event);
    });

    $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
      console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
      console.log(unfoundState, fromState, fromParams);
    });

});
