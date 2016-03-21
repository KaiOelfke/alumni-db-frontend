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

      // entry point
      requestAllEvents();

    }]);
