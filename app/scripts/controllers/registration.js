'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SigninCtrl
 * @description
 * # SignInCtrl
 * Controller of the alumni-db-frontend
 */

function registrationCtrl($auth, $state, countriesFactory, $scope) {

    var _personalData = {};

    function getYears() {
          var input = [];
          var min = 1900;
          var max = moment().year();
          for (var i=min; i<=max; i++){
            input.push(i);
          }
          return input;
        }
    $scope.possibleYears = getYears();

    
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


    $scope.getCountries = countriesFactory.getCountries();

}

angular.module('alumni-db-frontend')
  .controller('RegistrationCtrl', ['$auth', '$state', 'countriesFactory', '$scope', registrationCtrl]);



