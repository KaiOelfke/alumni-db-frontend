'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SigninCtrl
 * @description
 * # SignInCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');

app.controller('SigninCtrl', [
  '$auth',
  '$state',
  'toaster',
  'validationMessagesFactory',
  'authorizationService',
  'USER_ROLES',
  '$scope',
  function($auth, $state, toaster, validationMessagesFactory, authorizationService, USER_ROLES, $scope) {

    $scope.signinData = {};
    $scope.formValidationMessages = validationMessagesFactory.getValidationMsg;
    $scope.farmValidationTitle = validationMessagesFactory.getValidationTitle;

    $scope.handleSignInBtnClick = function() {
      $scope.$broadcast('show-errors-messages-block');

      if ($scope.signinForm.$invalid) {
        return ;
      }

      $auth.submitLogin($scope.signinData)
        .then(function(resp) {
          var user = resp;
          if (user.statuses.indexOf(USER_ROLES.completedProfile) !== -1) {
            $state.transitionTo('home.loggedin.home', {location:'replace'});
          }else {
             $state.transitionTo('home.loggedin.registration', {location:'replace'});
          }
        })
        .catch(function() {
          toaster.pop('error', 'your password / username is wrong.');
        });
    };
  }
]);
