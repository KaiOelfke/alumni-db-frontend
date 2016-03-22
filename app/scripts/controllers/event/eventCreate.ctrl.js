'use strict';

/**
  * @ngdoc controller
  * @name eventCreateCtrl
  * @requires $scope
  *
  * @description
  * TODO: Write description of this controller
  */
angular
  .module('alumni-db-frontend')
  .controller('eventCreateCtrl', [
    'eventService',
    '$scope',
    '$state',
    'toaster', function(eventService, $scope, $state, toaster) {

      $scope.newEvent = {};

      $scope.createEvent = function(event) {
        eventService
          .createEvent(event)
          .then(function successCallback(event) {
            $state.go('home.event-show', {
              id: event.id
            });
          }, function errorCallback(response) {
            // TODO: Use toaster to display this error message
            console.error('could not create event', response);
          });
      };

    }]);
