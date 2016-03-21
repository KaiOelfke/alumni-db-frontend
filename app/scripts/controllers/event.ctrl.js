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
    '$scope',
    'eventService', function($scope, eventService) {

      $scope.test = 'Hello, world!';

      eventService
        .getAllEvents()
        .then(function successCallback(events) {
          console.log('received events', events);
        }, function errorCallback(response) {
          // TODO: Use toaster to display this error message
          console.error('could not receive response', response);
        });

    }]);
