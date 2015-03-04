'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');


app.controller('ProfileCtrl', [
  'usersFactory',
  'countriesFactory',
  'programTypesFactory',
  'genderFactory',
  '$state',
  '$scope',
  'data',
  '$rootScope',
  function(usersFactory, countriesFactory, programTypesFactory, genderFactory, $state, $scope, data, $rootScope) {
    var _user  = data.data;
    /*jshint camelcase: false */
    if (moment(_user.date_of_birth,'YYYY-MM-DD').isValid()) {
      _user.date_of_birth = moment(_user.date_of_birth,'YYYY-MM-DD').format('DD.MM.YYYY');
    }
    _user.country = countriesFactory.getFromPermittedCountry(_user.country);
    _user.program_type = programTypesFactory.getTypeName(_user.program_type);
    _user.country_of_participation = countriesFactory.getFromAllCountry(_user.country_of_participation);
    _user.gender = genderFactory.getGenderName(_user.gender);

    $scope.userData = _user;
    $scope.editEnabled = $rootScope.isOwner(_user.id);
    $scope.goToUpdateUser = function() {
      $state.go('home.loggedin.profile-update');
    };

  }
]);

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:ProfileUpdateCtrl
 * @description
 * # ProfileUpdateCtrl
 * Controller of the alumni-db-frontend
 */

app.controller('ProfileUpdateCtrl', [
  'countriesFactory',
  'yearsFactory',
  'validationMessagesFactory',
  '$auth',
  '$state',
  'toaster',
  '$scope',
  '$rootScope',
  function(countriesFactory, yearsFactory, validationMessagesFactory, $auth, $state, toaster, $scope, $rootScope) {
    var _user = $rootScope.user;
    console.log(_user);
    $scope.formValidationMessages = validationMessagesFactory.getValidationMsg;
    $scope.farmValidationTitle = validationMessagesFactory.getValidationTitle;
    /*jshint camelcase: false */

    if (moment(_user.date_of_birth,'YYYY-MM-DD').isValid()) {
      _user.date_of_birth = moment(_user.date_of_birth,'YYYY-MM-DD').format('DD.MM.YYYY');
    }

    /*ToDO: Probably this can be more elegant. We create a copy of _user
    with the following line and assign that to tempUserData so that tempUserData is unique and updating the profile doesn't result in live data binding changes of names in the nav bar. We only want those changes when the user actually successfully submits the change.
    */
    $scope.tempUserData = JSON.parse(JSON.stringify(_user));
    $scope.getCountries = countriesFactory.getCountries();
    $scope.possibleYears = yearsFactory.getYears();
    $scope.getAllCountries = countriesFactory.getAllCountries();

    $scope.submitUpdatedUserData = function(tempUserData) {
      $scope.$broadcast('show-errors-messages-block');

      if ($scope.updateUserForm.$invalid) {
        return ;
      }
      $scope.userData = tempUserData;
      console.log(tempUserData.date_of_birth);
      $auth.updateAccount(tempUserData)
        .then(function() {
            $state.go('home.loggedin.profile-show', {id: _user.id});
        })
        .catch(function() {
          toaster.pop('error', 'Something went wrong.');
        });
    };

    var max = new Date();
    max.setDate(max.getDate - 365*10);
    $scope.maxDate = max;

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      startingDay: 1,
      showWeeks: false
    };

    $scope.format = 'DD.MM.YYYY';

  }
]);
