
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
          if (user.statuses.indexOf(USER_ROLES.profileCompleted) !== -1) {
            $state.transitionTo('home.loggedin.home', {location:'replace'});
          }else {
             $state.transitionTo('home.loggedin.registration', {location:'replace'});
          }
          console.log('You have successfully logged in. ', resp);
        })
        .catch(function(resp) {
          console.log('your password / username is wrong. ', resp);
        });
    };
  }
]);
