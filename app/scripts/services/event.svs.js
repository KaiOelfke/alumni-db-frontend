'use strict';

/**
 * @ngdoc service
 * @name searchService
 *
 * @description A service which provides different functions to interact
 * with the backend search API.
 */
angular
  .module('alumni-db-frontend')
  .service('eventService', [
    '$http',
    'API_HOST',
    '$q', function($http, API_HOST, $q) {
    // var urlBase = API_HOST + '/events';
    var eventService = {};

    /**
     * Executes a request to get all events.
     * @return {Object}            A promise object returned by the $http
     *                             service.
     */
    eventService.getAllEvents = function() {
      var def = $q.defer();
      var events = [
        {
          name: 'Cool Event',
          description: 'This is a cool event, bitch!'
        },
        {
          name: 'Coolest Event',
          description: 'This is the coolest event, BITH!'
        }
      ];
      def.resolve(events);
      return def.promise;
    };

    return eventService;
  }]);
