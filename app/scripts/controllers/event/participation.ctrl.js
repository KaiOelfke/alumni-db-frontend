'use strict';

angular
  .module('alumni-db-frontend')
  .controller('participationCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    'eventService',
    'feeService',
    'codeService',
    'displayErrors', function($rootScope, $scope, $state, $stateParams, eventService, feeService, codeService, displayErrors) {

      $scope.eventId = $stateParams.id;

      $scope.event;

      $scope.enteredCode = null;

      $scope.newApplication = {};

      $scope.toggleEnterCodeView = function() {
        if ($scope.enteredCode) {
          $scope.enteredCode = null;
        } else {
          $scope.enteredCode = {};
        }
      };

      $scope.enterCode = function() {
        console.log('entered code', $scope.enteredCode);
      };

      $scope.createCode = function() {
        codeService
          .createCode($scope.newCode)
          .then(
            function successCallback() {
              console.log('success');
            },

            // TODO: use toaster for displaying this error message
            function errorCallback(response) {
              console.error(displayErrors.convertErrorResponse(response));
            }
          );
      };

      $scope.clearApplicationForm = function() {
        $scope.newApplication = {};
      };

      $scope.apply = function() {
        var request = {
          userId: $rootScope.user.id
        };
        request = angular.extend(request, $scope.newApplication);
        console.log('need to apply with object', request);
      };

      eventService
        .getEvent($scope.eventId)
        .then(
          function successCallback(event) {
            $scope.event = event;
          },

          // TODO: use toaster for displaying this error message
          function errorCallback(response) {
            console.error(displayErrors.convertErrorResponse(response));
          }
        );

    }]);
