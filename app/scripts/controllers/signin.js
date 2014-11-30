'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SigninCtrl
 * @description
 * # SignInCtrl
 * Controller of the alumni-db-frontend
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

angular.module('alumni-db-frontend')
  .controller('SigninCtrl', ['$auth', '$scope', signinCtrl]);



