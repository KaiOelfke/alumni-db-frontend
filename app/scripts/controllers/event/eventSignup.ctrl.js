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
    'data',
    'displayErrors', function($rootScope, $scope, $state, $stateParams, eventService, feeService, codeService, data, displayErrors) {

      $scope.event = data.event;

      $scope.enteredCode = null;

      $scope.codeWasValid = false;

      $scope.fee;

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
        var event_id = $scope.event.id;
        var user_id = $rootScope.user.id;
        var code_input = $scope.enteredCode.code;
        codeService
          .validateCode(event_id, user_id, code_input)
          .then(function successCallback(response) {

            $scope.codeWasValid = true;
            $scope.fee = response;
            $scope.toggleEnterCodeView();
          }, function errorCallback(errorMessage) {

            console.error('invalid code:', errorMessage);
            $scope.codeWasValid = false;
          });

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

      console.log('event here:', $scope.event);

    }]);
