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
  'avatarFactory',
  '$rootScope',
  function(usersFactory, countriesFactory, programTypesFactory,
           genderFactory, $state, $scope, data, avatarFactory, $rootScope) {
    var _user  = data.data;
    /*jshint camelcase: false */
    if (moment(_user.date_of_birth,'YYYY-MM-DD').isValid()) {
      _user.date_of_birth = moment(_user.date_of_birth,'YYYY-MM-DD').toDate();
    }
    _user.country = countriesFactory.getFromAllCountry(_user.country);
    _user.program_type = programTypesFactory.getTypeName(_user.program_type);
    _user.country_of_participation = countriesFactory.getFromAllCountry(_user.country_of_participation);
    _user.gender = genderFactory.getGenderName(_user.gender);

    $scope.userData = _user;
    $scope.editEnabled = $rootScope.isOwner(_user.id);
    $scope.getAvatar = avatarFactory.getUserAvatar;
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
  'avatarFactory',
  '$scope',
  '$rootScope',
  function(countriesFactory, yearsFactory, validationMessagesFactory, $auth,
           $state, toaster, avatarFactory, $scope, $rootScope) {
    var _user = $rootScope.user;
    $scope.formValidationMessages = validationMessagesFactory.getValidationMsg;
    $scope.farmValidationTitle = validationMessagesFactory.getValidationTitle;

    /*ToDO: Probably this can be more elegant. We create a copy of _user
    with the following line and assign that to tempUserData so that
    tempUserData is unique and updating the profile doesn't result in
    live data binding changes of names in the nav bar. We only want
    those changes when the user actually successfully submits the change.
    */

    $scope.tempUserData = JSON.parse(JSON.stringify(_user));
    $scope.getCountries = countriesFactory.getCountries();
    $scope.possibleYears = yearsFactory.getYears();
    $scope.getAllCountries = countriesFactory.getAllCountries();
    $scope.uploadingStatus = undefined;

    $scope.fileSelected = function (files) {
      avatarFactory.uploadAvatar(files).then(function (data) {
        $scope.tempUserData.avatar = data.data.avatar;
        $scope.uploadingStatus = undefined;
      }, function () {
        $scope.uploadingStatus = undefined;
        toaster.error('Something went wrong');
      }, function (progress) {
        $scope.uploadingStatus = 'uploading: '+ progress + '%';
      });
    };


    $scope.getAvatar = avatarFactory.getUserAvatar;



    /*jshint camelcase: false */
    if (moment($scope.tempUserData.date_of_birth,'YYYY-MM-DD').isValid()) {
      $scope.tempUserData.date_of_birth = moment($scope.tempUserData.date_of_birth,'YYYY-MM-DD').toDate();
    }

    if (moment($scope.tempUserData.member_since,'YYYY-MM-DD').isValid()) {
      $scope.tempUserData.member_since = moment($scope.tempUserData.member_since,'YYYY-MM-DD').toDate();
    }




    $scope.submitUpdatedUserData = function(tempUserData) {
      $scope.$broadcast('show-errors-messages-block');
      if ($scope.updateUserForm.$invalid) {
        return;
      }

      // Fix timezone difference
      var offset = tempUserData.date_of_birth.getTimezoneOffset();
      tempUserData.date_of_birth = new Date(tempUserData.date_of_birth.getTime() - (offset * (60 * 1000)));

      if (tempUserData.member_since) {
        offset = tempUserData.member_since.getTimezoneOffset();
      tempUserData.member_since = new Date(tempUserData.member_since.getTime() - (offset * (60 * 1000)));
    }

      $scope.userData = tempUserData;
      $auth.updateAccount(tempUserData).then(function() {
            $state.go('home.profile-show', {id: _user.id});
        })
        .catch(function() {
          toaster.pop('error', 'Something went wrong.');
        });
    };

    var max = new Date();
    max.setDate(max.getDate - 365*10);
    $scope.maxDate = max;

    $scope.open = function($event,opened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[opened] = true;
    };

    $scope.dateOptions = {
      startingDay: 1,
      showWeeks: false
    };
  }
]);
