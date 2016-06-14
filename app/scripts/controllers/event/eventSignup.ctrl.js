'use strict';

angular
  .module('alumni-db-frontend')
  .controller('eventSignupCtrl', [
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

      $scope.newParticipation = {};

      $scope.toggleEnterCodeView = function() {
        if ($scope.enteredCode) {
          $scope.enteredCode = null;
        } else {
          $scope.enteredCode = {};
        }
      };

      $scope.enterCode = function() {
        console.log('entered code', $scope.enteredCode);
        //TODO: Validate code
        if ($scope.enteredCode.code.length > 3) {
          //valid code
          $scope.enteredCode.valid = true;
        } else {
          // false code
          $scope.enteredCode.valid = false;

        }
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

      $scope.clearParticipationForm = function() {
        $scope.newParticipation = {};
      };

      $scope.participate = function() {
        //TODO: Integreate backend, add completion handlers
        $scope.participationComplete = true;
        var request = {
          userId: $rootScope.user.id
        };
        request = angular.extend(request, $scope.newParticipation);
        console.log('need to participate with object', request);
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
