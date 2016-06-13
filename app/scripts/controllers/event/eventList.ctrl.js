'use strict';

/**
  * @ngdoc controller
  * @name eventListCtrl
  * @requires $scope
  *
  * @description
  * TODO: Write description of this controller
  */
angular
  .module('alumni-db-frontend')
  .controller('eventListCtrl', [
    'eventService',
    '$scope',
    '$state',
    'toaster', function(eventService, $scope, $state, toaster) {

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
        $scope.confirmDeleteID = -1;
      };

      $scope.newEvent = null;

      $scope.toggleCreateEventView = function() {
        if ($scope.newEvent) {
          $scope.newEvent = null;
        } else {
          $scope.newEvent = {};
        }
      };

      $scope.createEvent = function(event) {
        eventService
          .createEvent(event)
          .then(function successCallback() {
            toaster.pop('success', 'successfully created event');
            $scope.toggleCreateEventView();
            requestAllEvents();
          }, function errorCallback(error) {

            toaster.pop('error', error);
          });
      };

      $scope.removeEvent = function(event) {
        $scope.confirmDeleteID = event.id;
        
      };

      $scope.confirmRemove = function(event) {
        console.log('removing event', event);
        eventService
          .removeEvent(event.id)
          .then(function successCallback() {
            toaster.pop('success', 'successfully removed event');
            requestAllEvents();
          }, function errorCallback(error) {
            toaster.pop('error', error);
          });
      };

      $scope.eventsAvailable = function() {
        if ($scope.events) {
          for (var i = 0; i < $scope.events.length; i++) {
            if (!$scope.events[i].delete_flag) {
              return true;
            }
          }
        }

        return false;
      };

      // entry point
      requestAllEvents();

    }]);
