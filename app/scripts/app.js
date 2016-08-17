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
    'ui.router',
    'toaster',
    'ngFileUpload',
    'ui.bootstrap'
  ])
  .constant('USER_ROLES', {
    superUser: 'superUser',
    premium: 'premium',
    registered: 'registered',
    confirmedEmail: 'confirmedEmail',
    completedProfile: 'completedProfile',
    guest: 'guest'
  })
  .constant('AUTHZ_EVENTS', {
    notAuthorized: 'notAuthorized'
  })
  .config([
    '$compileProvider',
    function($compileProvider)
    {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|tel|mailto|skype):/);
    }
  ])
  .config(function($authProvider, API_HOST) {

    var formatConvertar = function(response) {
      response = response.data;
      var statuses = [];

      /*jshint camelcase: false */

      if (response.registered)
      {
        statuses.push('registered');
      }

      if (response.confirmed_email)
      {
        statuses.push('confirmedEmail');
      }

      if (response.completed_profile)
      {
        statuses.push('completedProfile');
      }

      if (response.is_super_user)
      {
        statuses.push('superUser');
      }

      if (response.is_premium)
      {
        statuses.push('premium');
      }

      response.statuses = statuses;
      return response;
    };

    $authProvider.configure({
      apiUrl: API_HOST,
      accountUpdatePath: '/users',
      storage: 'localStorage',
      passwordResetSuccessUrl: window.location.origin + '/#/password-update',
      handleLoginResponse: formatConvertar,
      handleAccountUpdateResponse: formatConvertar,
      handleTokenValidationResponse: formatConvertar,
      passwordResetPath: '/auth/password/',
      passwordUpdatePath: '/auth/password/'
    });
  })
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

    $urlRouterProvider
      .when('', '/')
      .otherwise('/404');

    // For any unmatched url

    $stateProvider
      .state('home', {
        url: '',
        abstract: true,
        templateUrl: 'views/home.html',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.registered,
              USER_ROLES.confirmedEmail,
              USER_ROLES.completedProfile
            ];
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.start-page', {
        url: '/',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.completedProfile;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.profile-show', {
        url: '/profile/:id',
        templateUrl: 'views/show-profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.completedProfile];
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          },

          data: function(usersFactory, $stateParams) {
            return usersFactory.getUser($stateParams.id);
          }
        }
      })
      .state('home.profile-update', {
        url: '/update',
        templateUrl: 'views/update-profile.html',
        controller: 'ProfileUpdateCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.completedProfile];
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.profile-password-update', {
        url: '/password-update',
        templateUrl: 'views/password-update.html',
        controller: 'ProfileUpdateCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.completedProfile];
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.registration', {
        url: '/registration',
        templateUrl: 'views/home-registration/main.html',
        controller: 'RegistrationCtrl',
        controllerAs: 'registration',
        resolve: {
          notAuthorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.guest,
              USER_ROLES.completedProfile
            ];
          },

          authz: function(notAuthorizedRoles, authorizationService) {
            return authorizationService.isNotAuthorized(notAuthorizedRoles);
          }
        }
      })
      .state('home.plan-management', {
        url: '/plan-management',
        templateUrl: 'views/plans.html',
        controller: 'planCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.superUser;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })

      // TODO: make this an abstract state
      .state('home.event', {
        url: '/event',
        templateUrl: 'views/event/event-list.html',
        controller: 'eventListCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.completedProfile];
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.event-create', {
        url: '/event/create',
        templateUrl: 'views/event/event-create.html',
        controller: 'eventCreateCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.superUser;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('home.event-show', {
        url: '/event/:id',
        templateUrl: 'views/event/event-show.html',
        controller: 'eventShowCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.completedProfile];
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          },

          data: function(eventService, feeService, $stateParams) {
            return eventService
              .getEvent($stateParams.id)
              .then(function successCallback(event) {
                return feeService
                  .getFeesForEvent(event.id)
                  .then(function successCallback(fees) {
                    return {
                      event: event,
                      fees: fees
                    };
                  }, function errorCallback() {

                    return {
                      event: event,
                      fees: []
                    };
                  });
              }, function errorCallback(error) {
                // TODO: Make a state change
                console.error(error);
              });
          }
        }
      })
      .state('home.event-signup', {
        url: '/event/:id/signup',
        templateUrl: 'views/event/event-signup-show.html',
        controller: 'eventSignupCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.completedProfile];
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          },

          data: function(eventService, feeService, $stateParams) {
            return eventService
              .getEvent($stateParams.id)
              .then(function successCallback(event) {
                console.log('received event info:', event);
                return {
                  event: event
                };
              }, function errorCallback(error) {

                // TODO: Make a state change
                console.error(error);
              });
          }
        }
      })
      .state('home.event-payment', {
        url: '/event/:id/payment',
        templateUrl: 'views/event/event-payment.html',
        controller: 'braintreeCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return [USER_ROLES.completedProfile];
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          },

          data: function(eventService, $stateParams) {
            return eventService
              .getEvent($stateParams.id)
              .then(function successCallback(event) {
                return {
                  event: event
                };
              }, function errorCallback(error) {
                // TODO: Make a state change
                console.error(error);
              });
          }
        }
      })
      .state('home.event-codes', {
        url: '/event/:id/codes',
        templateUrl: 'views/event/codes-show.html',
        controller: 'codesCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.superUser;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          },

          data: function(eventService, feeService, codeService, $stateParams) {
            return eventService
              .getEvent($stateParams.id)
              .then(function successCallback(event) {
                return feeService
                  .getFeesForEvent(event.id)
                  .then(function successCallback(fees) {
                    return codeService
                      .getCodesForEvent(event.id)
                      .then(function successCallback(codes) {
                        return {
                          event: event,
                          fees: fees,
                          codes: codes
                        };
                      }, function errorCallback() {

                        return {
                          event: event,
                          fees: fees,
                          codes: []
                        };
                      });

                  }, function errorCallback() {

                    return {
                      event: event,
                      fees: []
                    };
                  });
              }, function errorCallback(error) {
                // TODO: Make a state change
                console.error(error);
              });
          }
        }
      })
      .state('home.become-premium', {
        url: '/become-premium',
        templateUrl: 'views/become-premium.html',
        controller: 'braintreeCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.completedProfile;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          },

          data: function() {
            return null;
          }
        }
      })
      .state('home.premium', {
        url: '/premium',
        templateUrl: 'views/premium.html',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.premium;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('guest', {
        url: '',
        abstract: true,
        templateUrl: 'views/splash.html',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.guest;
          },

          authz: function($state, authorizationService) {
            return authorizationService.isAuthorized($state.current.data);
          }
        }
      })
      .state('guest.signup', {
        url: '/signup',
        templateUrl: 'views/splash-signup.html',
        controller: 'SignupCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.guest;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('guest.signin', {
        url: '/signin',
        templateUrl: 'views/splash-signin.html',
        controller: 'SigninCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.guest;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('guest.reset', {
        url: '/reset',
        templateUrl: 'views/splash-password-reset.html',
        controller: 'ResetCtrl',
        resolve: {
          authorizedRoles: function(USER_ROLES) {
            return USER_ROLES.guest;
          },

          authz: function(authorizedRoles, authorizationService) {
            return authorizationService.isAuthorized(authorizedRoles);
          }
        }
      })
      .state('404', {
        url: '/404',
        templateUrl: 'views/404.html'
      });

  }).run(function($rootScope, $state, AUTHZ_EVENTS, USER_ROLES, toaster) {
    $rootScope.$on('auth:registration-email-success', function() {
      //$state.go('home.loggedin.registration');
    });

    $rootScope.$on('auth:email-confirmation-success', function() {
      $state.go('home');
    });

    $rootScope.$on('auth:email-confirmation-error', function() {
      window.alert('There was an error with your registration.');
    });

    $rootScope.$on('notAuthorized', function() {
      /*if ($state.current.name !== '') {
        $state.transitionTo($state.current.name, {reload: true});
      } else {
        $state.go('home.start-page');
      }*/
      /*jshint quotmark: false*/
    });
    /*
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, error){
        });    */

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error === AUTHZ_EVENTS.notAuthorized) {
        if (fromState.name !== '') {
          toaster.pop('warning', 'Not authorized', 'Sorry. You are not allowed to see this page.');
        }

        if (!$rootScope.user || !$rootScope.user.statuses) {
          $state.transitionTo('guest.signin');
        } else if ($rootScope.user.statuses.indexOf(USER_ROLES.completedProfile) === -1) {
          $state.transitionTo('home.registration');
        } else {
          $state.transitionTo('home.start-page');
        }
      }
    });

    $rootScope.isOwner = function(uid) {
      return $rootScope.user.id === uid;
    };

    $rootScope.isSuperUser = function() {
      /*jshint camelcase: false */
      console.log(!!$rootScope.user.is_super_user);
      return !!$rootScope.user.is_super_user;
    };

  });
