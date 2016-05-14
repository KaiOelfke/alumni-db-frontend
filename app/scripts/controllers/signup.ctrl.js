'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');

app.controller('SignupCtrl', [
  'validationMessagesFactory',
  '$auth',
  '$state',
  'toaster',
  '$scope',
  function(validationMessagesFactory, $auth, $state, toaster, $scope) {
    $scope.signupData = {};
    $scope.formValidationMessages = validationMessagesFactory.getValidationMsg;
    $scope.farmValidationTitle = validationMessagesFactory.getValidationTitle;

    $scope.handleSignUpBtnClick = function(signupData) {
      $scope.$broadcast('show-errors-messages-block');

      if ($scope.signupForm.$invalid) {
        return;
      }

      $auth.submitRegistration(signupData)
        .then(function() {
          $state.go('home.registration');
        })
        .catch(function() {
          toaster.pop('error', 'Something went wrong.');
        });
    };
  }
]);
