
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
  'authorizationService',  
  'USER_ROLES',
  '$scope',
  function($auth, $state, authorizationService, USER_ROLES, $scope) {

    $scope.signinData = {};

    $scope.handleSignInBtnClick = function() {
      $auth.submitLogin($scope.signinData)
        .then(function(resp) {
          var user = resp;
          if (user.statuses.indexOf(USER_ROLES.registered) !== -1) {
            $state.go('home.loggedin.index');
          }else {
            $state.go('home.loggedin.registration');
          }
          console.log('You have successfully logged in. ', resp);
        })
        .catch(function(resp) {
          $scope.signinData.alerts = {type: 'error', msg: ''};
          console.log('your password / username is wrong. ', resp);
        });
    };
  }
]);
