'use strict';

angular
  .module('alumni-db-frontend')
  .controller('codesCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    'eventService',
    'displayErrors',
    'data',
    'codeService', function($rootScope, $scope, $state, $stateParams, eventService, displayErrors, data, codeService) {

      $scope.event = data.event;

      $scope.fees = data.fees;

      $scope.codes = data.codes;
      
      $scope.newCode;

      $scope.toggleCreateCodeView = function() {
        if ($scope.newCode) {
          $scope.newCode = null;
        } else {
          $scope.newCode = {};
        }
      };

      $scope.clearCreateCodeForm = function() {
        $scope.newCode = {};
      };

      $scope.createCode = function() {
        var user_id = $rootScope.user.id;
        var fee_id = $scope.newCode.fee_id;
        codeService
          .createCode(user_id, fee_id)
          .then(function successCallback(response) {
            $scope.codes.push(response.data.data)
          }, function errorCallback(errorMessage) {
            // TODO: Use toaster for this
            console.error(errorMessage);
          });
      };

      $scope.removeCode = function(code) {
        $scope.codes = $scope.codes.pop();
      };

    }]);
