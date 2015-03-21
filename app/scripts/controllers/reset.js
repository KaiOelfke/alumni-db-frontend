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
  '$scope',
  function(validationMessagesFactory, $auth, $state, toaster, $scope) {
    $scope.formValidationMessages = validationMessagesFactory.getValidationMsg;
    $scope.farmValidationTitle = validationMessagesFactory.getValidationTitle;

    $scope.handleResetBtnClick = function(passwordResetData) {
      $scope.$broadcast('show-errors-messages-block');

      if ($scope.passwordResetForm.$invalid) {
        return ;
      }
      $auth.requestPasswordReset(passwordResetData)
        .then(function() {
          $state.go('guest.signin');
        })
        .catch(function() {
          toaster.pop('error', 'Something went wrong.');
        });
    };
  }
]);

})();
