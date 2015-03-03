'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:registrationCtrl
 * @description
 * # registrationCtrl
 * Controller of the alumni-db-frontend
 */

function registrationCtrl(validationMessagesFactory, yearsFactory, countriesFactory) {
    /*jshint validthis: true */
    this._personalData = {};
    this.possibleYears = yearsFactory.getYears();
    this.formValidationMessages = validationMessagesFactory.getValidationMsg;
    this.farmValidationTitle = validationMessagesFactory.getValidationTitle;
    this.getAllCountries = countriesFactory.getAllCountries();
    this.getCountries = countriesFactory.getCountries();
}

angular.module('alumni-db-frontend')
  .controller('RegistrationCtrl', ['validationMessagesFactory', 'yearsFactory', 'countriesFactory', registrationCtrl]);


/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:registrationPersonalCtrl
 * @description
 * # registrationPersonalCtrl
 * Controller of the alumni-db-frontend
 */

function registrationPersonalCtrl($scope) {
    /*jshint validthis: true */
    this.personalInformation = function(personalData) {
      $scope.$broadcast('show-errors-messages-block');
      if ($scope.personalForm.$invalid) {
        return;
      }
      $scope.registration._personalData = personalData;
      $scope.registration.infoForm = 'program-info';
    };

}

angular.module('alumni-db-frontend')
  .controller('RegistrationPersonalCtrl', ['$scope', registrationPersonalCtrl]);


/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:registrationProgramCtrl
 * @description
 * # registrationProgramCtrl
 * Controller of the alumni-db-frontend
 */

function registrationProgramCtrl($auth, $state, toaster, $scope) {
    /*jshint validthis: true */
    this.programInformation = function(programData) {
      $scope.$broadcast('show-errors-messages-block');
      if ($scope.programForm.$invalid) {
        return ;
      }

      var profileData = {};

      angular.extend(profileData, programData, $scope.registration._personalData);

      $auth.updateAccount(profileData)
        .then(function() {
            $state.go('home.loggedin.home');
            toaster.pop('success', 'updated');
        })
        .catch(function() {
            toaster.pop('error', 'Something went wrong.');            
        });


    };   

}

angular.module('alumni-db-frontend')
  .controller('RegistrationProgramCtrl', ['$auth', '$state', 'toaster', '$scope', registrationProgramCtrl]);




