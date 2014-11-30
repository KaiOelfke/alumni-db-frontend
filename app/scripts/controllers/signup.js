'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumni-db-frontend
 */

function signupCtrl($auth, $scope) {

    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function(resp) {
            console.log('You have successfully registered. ', resp);
        })
        .catch(function(resp) {
            console.log('your information is wrong. ', resp);
        });
    };

  }

angular.module('alumni-db-frontend')
  .controller('SignupCtrl', ['$auth', '$scope', signupCtrl]);



