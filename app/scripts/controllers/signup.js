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
          $state.transitionTo('home.registration', {location:'replace'});
          console.log('You have successfully signed up. ', resp);
        })
        .catch(function(resp) {
          console.log('Something went wrong. ', resp);
        });
    };
  }
]);

})();
