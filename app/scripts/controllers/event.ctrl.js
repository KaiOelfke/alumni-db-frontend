'use strict';

/**
  * @ngdoc controller
  * @name eventCtrl
  * @requires $scope
  *
  * @description
  * TODO: Write description of this controller
  */
angular
  .module('alumni-db-frontend')
  .controller('eventCtrl', [
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

      var requestAllEvents = function() {
        eventService
          .getAllEvents()
          .then(function successCallback(events) {
            console.log('received events', events);
            $scope.events = events;
          }, function errorCallback(response) {
            // TODO: Use toaster to display this error message
            console.error('could not receive response', response);
          });
      };

      // request all plans only if user is in list view
      if ($state.current.name === 'home.event') {
        console.log('requesting all events');
        requestAllEvents();
      }

    }]);