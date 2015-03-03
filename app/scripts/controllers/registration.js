'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SigninCtrl
 * @description
 * # SignInCtrl
 * Controller of the alumni-db-frontend
 */

function registrationCtrl($auth, $state, yearsFactory, countriesFactory, $scope) {

    var _personalData = {};

    $scope.possibleYears = yearsFactory.getYears();


    $scope.personalInformation = function(personalData) {
      _personalData = personalData;
      $scope.infoForm = 'program-info';
    };

    $scope.programInformation = function(programData) {
      var profileData = {};

      angular.extend(profileData, programData, _personalData);

      $auth.updateAccount(profileData)
        .then(function(resp) {
            $state.go('home.loggedin.home');
            console.log('data updated ', resp);
        })
        .catch(function(resp) {
            console.log( resp);
        });


    };

    $scope.getAllCountries = countriesFactory.getAllCountries();
    $scope.getCountries = countriesFactory.getCountries();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      startingDay: 1,
      showWeeks: false
    };

    $scope.format = 'dd.MM.yyyy';
}

angular.module('alumni-db-frontend')
  .controller('RegistrationCtrl', ['$auth', '$state', 'yearsFactory', 'countriesFactory', '$scope', registrationCtrl]);



