'use strict';

angular
  .module('alumni-db-frontend')
  .controller('participationCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'eventService',
    'displayErrors', function($scope, $state, $stateParams, eventService, displayErrors) {

      $scope.eventId = $stateParams.id;

      $scope.event;

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
