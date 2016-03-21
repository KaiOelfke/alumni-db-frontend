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
        console.log('creating event, event');
        eventService
          .insertEvent(event)
          .then(function successCallback() {
            toaster.pop('success', 'Event successfully created.');
          }, function errorCallback(response) {
            // TODO: Use toaster to display this error message
            console.error('could not create event', response);
          });
      };

    }]);
