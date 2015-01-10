'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:authorizationService
 * @description
 * # authorizationService
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('authorizationService', ['$q','$auth', 'USER_ROLES', 'AUTHZ_EVENTS', '$rootScope',
                                   function ($q, $auth, USER_ROLES, AUTHZ_EVENTS, $rootScope) {

        var authorizationService = {};

        authorizationService.isAuthorized = function (authorizedRoles) {
          if (typeof authorizedRoles === 'undefined') {
            return true;
          }

          var deferred = $q.defer();

          if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
          }

          $auth.validateUser().then(
            function (user) {

              var userStatuses = user.statuses;
              console.log(userStatuses);
              for (var i = 0, len = userStatuses.length; i < len; i++) {
                console.log(userStatuses[i]);
                if (authorizedRoles.indexOf(userStatuses[i]) !== -1) {
                  deferred.resolve();
                  return;
                }
              }

              deferred.reject('Greeting ' + name + ' is not allowed.');

              $rootScope.$broadcast(AUTHZ_EVENTS.notAuthorized);
              
            },
            function () {
                $rootScope.$broadcast('auth:not-loggedin');

                if (authorizedRoles.indexOf(USER_ROLES.guest) !== -1){
                  deferred.resolve();          
                  return;       
                }

                $rootScope.$broadcast(AUTHZ_EVENTS.notAuthorized);
            });

          return deferred;          

        };
       
        return authorizationService;
  }]);


