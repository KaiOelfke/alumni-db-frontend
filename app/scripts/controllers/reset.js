(function(){
'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');

app.controller('ResetCtrl', [
  'validationMessagesFactory',
  '$auth',
  '$state',
  'toaster',
  'API_HOST',
  '$scope',
  function(validationMessagesFactory, $auth, $state, toaster, API_HOST, $scope) {
    $scope.formValidationMessages = validationMessagesFactory.getValidationMsg;
    $scope.farmValidationTitle = validationMessagesFactory.getValidationTitle;

    $scope.handleResetBtnClick = function(passwordResetData) {
      $scope.$broadcast('show-errors-messages-block');
      if ($scope.passwordResetForm.$invalid) {
        return ;
      }
      $auth.requestPasswordReset(passwordResetData)
        .then(function() {
          toaster.pop('success', 'Please check you email inbox for further instructions.');
          $state.go('guest.signin');
        })
        .catch(function() {
          toaster.pop('error', 'Something went wrong.');
        });
    };
  }
]);

})();
