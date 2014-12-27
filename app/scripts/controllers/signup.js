(function(){
'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumni-db-frontend
 */

function signupCtrl($auth, $state, $scope) {
  $scope.handleSignUpBtnClick = function() {
    $auth.submitRegistration($scope.signupForm)
      .then(function(resp) {
        $state.go('home.registration');
        console.log('You have successfully signed up. ', resp);
      })
      .catch(function(resp) {
        $scope.signupForm.alerts = {type: 'error', msg: ''};      
        console.log('your information is wrong. ', resp);
      });
  };
}

var app = angular.module('alumni-db-frontend');

app.controller('SignupCtrl', [
  '$auth', 
  '$state', 
  '$scope', 
  signupCtrl
]);

})();
