'use strict';

/**
 * @ngdoc service
 * @name eventService
 *
 * @description TODO: Write description for eventService
 */
angular
  .module('alumni-db-frontend')
  .service('eventService', [
    '$http',
    'API_HOST',
    '$q', function($http, API_HOST, $q) {

      var events = [
        {
          id: 0,
          name: 'Cool Event',
          description: 'This is a cool event, bitch!'
        },
        {
          id: 1,
          name: 'Coolest Event',
          description: 'This is the coolest event, BITCH!'
        }
      ];

      // var urlBase = API_HOST + '/event';
      var eventService = {};

      /**
       * Tries to insert an event to the database
       * @param  {Object} event The event in JSON format.
       * @return {Object}       A promise object returned by the $http
       *                        service.
       */
      eventService.insertEvent = function(event) {
        var def = $q.defer();
        var tmpEvent = angular.extend({}, event);
        tmpEvent.id = events.length;
        events.push(tmpEvent);
        def.resolve(tmpEvent);
        return def.promise;
      };

      eventService.getEvent = function(id) {
        var def = $q.defer();
        if (id < events.length) {
          def.resolve(events[id]);
        } else {
          def.reject('No event found with id ' + id);
        }

        return def.promise;
      };

      eventService.editEvent = function(id, event) {
        var def = $q.defer();
        if (id < events.length) {
          events[id] = event;
          def.resolve();
        } else {
          def.reject('No events found with id ' + id);
        }

        return def.promise;
      };

      /**
       * Executes a request to get all events.
       * @return {Object}            A promise object returned by the $http
       *                             service.
       */
      eventService.getAllEvents = function() {
        var def = $q.defer();
        def.resolve(events);
        return def.promise;
      };

      return eventService;
    }]);
