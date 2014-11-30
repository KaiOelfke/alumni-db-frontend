'use strict';

/**
 * @ngdoc function
 * @name alumniWebApp.controller:SigninCtrl
 * @description
 * # SignInCtrl
 * Controller of the alumniWebApp
 */

function signinCtrl($auth, $scope) {

    $scope.handleLoginBtnClick = function() {
          $auth.submitLogin($scope.loginForm)
            .then(function(resp) { 
                console.log('You have successfully logged in. ', resp);
            })
            .catch(function(resp) { 
                console.log('your password / username is wrong. ', resp);
            });
    };
}

angular.module('alumniWebApp')
  .controller('SigninCtrl', ['$auth', '$scope', signinCtrl]);



