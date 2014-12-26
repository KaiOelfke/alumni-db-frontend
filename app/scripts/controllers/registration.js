'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SigninCtrl
 * @description
 * # SignInCtrl
 * Controller of the alumni-db-frontend
 */

function registrationCtrl($auth, $state, countriesFactory, $scope) {
    $scope.infoForm = 'personal-info';

    $scope.completeRegistration = function(registrationForm) {
          $auth.updateAccount(registrationForm)
            .then(function(resp) {
                if ($scope.infoForm === 'program-info') {
                    $state.go('home.index');
                }
                $scope.infoForm = 'program-info';
                console.log('data updated ', resp);
            })
            .catch(function(resp) {
                console.log( resp);
            });
    };

    $scope.getCountries = countriesFactory.getCountries();

}

angular.module('alumni-db-frontend')
  .controller('RegistrationCtrl', ['$auth', '$state', 'countriesFactory', '$scope', registrationCtrl]);



