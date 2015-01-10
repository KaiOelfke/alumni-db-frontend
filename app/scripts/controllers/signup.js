(function(){
'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');

app.controller('SignupCtrl', [
  '$auth', 
  '$state', 
  '$scope', 
  function($auth, $state, $scope) {
    $scope.signupData = {};

    $scope.handleSignUpBtnClick = function(signupData) {
      $auth.submitRegistration(signupData)
        .then(function(resp) {
          $state.go('home.registration');
          console.log('You have successfully signed up. ', resp);
        })
        .catch(function(resp) {
          $scope.signupForm.alerts = {type: 'error', msg: ''};      
          console.log('Something went wrong. ', resp);
        });
    };
  }
]);

})();
