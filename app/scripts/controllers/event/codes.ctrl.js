'use strict';

angular
  .module('alumni-db-frontend')
  .controller('codesCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    'eventService',
    'displayErrors', function($rootScope, $scope, $state, $stateParams, eventService, displayErrors) {

      $scope.eventId = $stateParams.id;

      $scope.event;

      $scope.codes;

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
        console.log('need to create code', $scope.newCode);
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
