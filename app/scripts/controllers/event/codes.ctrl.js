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
    'codeService',
    'toaster', function($rootScope, $scope, $state, $stateParams, eventService, displayErrors, data, codeService, toaster) {

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

            $scope.newCode = null;
            getAllCodes();
          }, function errorCallback(errorMessage) {

            toaster.pop('error', errorMessage);
          });

      };

      $scope.removeCode = function(code) {
        codeService
          .removeCode(code.id)
          .then(function successCallback(response) {

            getAllCodes();
          }, function errorCallback(errorMessage) {

            toaster.pop('error', errorMessage);
          });

      };

      var getAllCodes = function() {
        codeService
          .getCodesForEvent($scope.event.id)
          .then(function successCallback(response) {

            $scope.codes = response;
          }, function errorCallback(errorMessage) {

            toaster.pop('error', errorMessage);
          });
      };

    }]);
