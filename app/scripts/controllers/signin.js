'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SigninCtrl
 * @description
 * # SignInCtrl
 * Controller of the alumni-db-frontend
 */

function signinCtrl($auth, $state, $scope) {

    $scope.handleSignInBtnClick = function() {
          $auth.submitLogin($scope.signinForm)
            .then(function(resp) {
                $state.go('home.index');
                console.log('You have successfully logged in. ', resp);

            })
            .catch(function(resp) {
                $scope.signinForm.alerts = {type: 'error', msg: ''};
                console.log('your password / username is wrong. ', resp);
            });
    };
}

angular.module('alumni-db-frontend')
  .controller('SigninCtrl', ['$auth', '$state', '$scope', signinCtrl]);



