'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SigninCtrl
 * @description
 * # SignInCtrl
 * Controller of the alumni-db-frontend
 */

function registrationCtrl($auth, $state, $scope) {
    $scope.infoForm = 'personal-info';

    $scope.completeRegistration = function(registrationForm) {
          $auth.updateAccount(registrationForm)
            .then(function(resp) {
                if ($scope.infoForm === 'program-info') {
                    $state.go('home.index');
                }
                console.log($scope.infoForm);
                $scope.infoForm = 'program-info';
                console.log('You have successfully logged in. ', resp);
            })
            .catch(function(resp) {
                console.log('your password / username is wrong. ', resp);
            });
    };
}

angular.module('alumni-db-frontend')
  .controller('RegistrationCtrl', ['$auth', '$state', '$scope', registrationCtrl]);



