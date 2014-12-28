
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
  '$scope', 
  function($auth, $state, $scope) {
    var signinData = {};

    $scope.handleSignInBtnClick = function() {
      $auth.submitLogin()
        .then(function(resp) {
          $state.go('home.index');
          console.log('You have successfully logged in. ', resp);
        })
        .catch(function(resp) {
          signinData.alerts = {type: 'error', msg: ''};
          console.log('your password / username is wrong. ', resp);
        });
    };
  }
]);
