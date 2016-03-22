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
      };

      $scope.newEvent = null;

      $scope.editedEvent = null;

      $scope.toggleCreateEventView = function() {
        if ($scope.newEvent) {
          $scope.newEvent = null;
        } else {
          $scope.newEvent = {};
        }
      };

      $scope.toggleEditEventView = function(event) {
        if ($scope.editedEvent) {
          $scope.editedEvent = null;
        } else {
          $scope.editedEvent = angular.extend({}, event);
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

      $scope.editEvent = function(event) {
        eventService
          .editEvent(event.id, event)
          .then(function successCallback() {
            toaster.pop('success', 'event successfully edited');
            $scope.toggleEditEventView();
            requestAllEvents();
          }, function errorCallback(error) {

            toaster.pop('error', error);
          });
      };

      // entry point
      requestAllEvents();

    }]);
