'use strict';

angular
  .module('alumni-db-frontend')
  .controller('participationCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    'eventService',
    'displayErrors', function($rootScope, $scope, $state, $stateParams, eventService, displayErrors) {

      $scope.eventId = $stateParams.id;

      $scope.event;

      $scope.newApplication = {};

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
