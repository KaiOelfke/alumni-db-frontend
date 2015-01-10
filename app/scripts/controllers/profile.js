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
  '$auth', 
  '$state', 
  'authorizationService',  
  'USER_ROLES',
  '$scope',
  function($auth, $state, authorizationService, USER_ROLES, $scope) {
    
    $scope.userData = {
      'id': 666, 
      'first_name': 'Max', 
      'last_name': 'Mustermann', 
      'country': 'Germany', 
      'city': 'Berlin', 
      'date_of_birth': '12.10.1990', 
      'program_type': 0, 
      'country_of_participation': 'Germany', 
      'institution': 'X', 
      'year_of_participation': '1991', 
      'student_company_name': 'Y'
    };

    $scope.goToUpdateUser = function() {
      $state.go('profile-update');
    };

    $scope.submitUpdatedUserData = function(userData) {
      console.log(userData);
    };
  }
]);
