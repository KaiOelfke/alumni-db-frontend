'use strict';

/**
 * @ngdoc function
 * @name alumniWebApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumniWebApp
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

angular.module('alumniWebApp')
  .controller('SignupCtrl', ['$auth', '$scope', signupCtrl]);



