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

      var urlBase = API_HOST + '/events';
      var eventService = {};

      /**
       * Tries to insert an event to the database
       * @param  {Object} event The event in JSON format.
       * @return {Object}       A promise object returned by the $http
       *                        service.
       */
      eventService.createEvent = function(event) {
        var deferred = $q.defer();
        $http
          .post(urlBase, {
            event: event
          })
          .then(function successCallback() {
            deferred.resolve();
          }, function errorCallback(response) {

            // TODO: figure out what to pass as a error message
            deferred.reject(response);
          });

        return deferred.promise;
      };

      eventService.getEvent = function(id) {
        var deferred = $q.defer();
        $http
          .get(urlBase + '/' + id)
          .then(function successCallback(response) {
            deferred.resolve(response.data.data);
          }, function errorCallback(response) {

            // TODO: figure out what to pass as a error message
            deferred.reject(response);
          });

        return deferred.promise;
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

      eventService.removeEvent = function(event_id) {
        var def = $q.defer();
        var eventFound = false;
        var res = [];
        for (var i = 0; i < events.length; i++) {
          var currentEvent = events[i];
          if (currentEvent.id !== event_id) {
            res.push(currentEvent);
          } else {
            eventFound = true;
          }
        }

        if (eventFound) {
          events = res;
          def.resolve();
        } else {
          def.reject();
        }

        return def.promise;
      };

      /**
       * Executes a request to get all events.
       * @return {Object}            A promise object returned by the $http
       *                             service.
       */
      eventService.getAllEvents = function() {
        var deferred = $q.defer();
        $http
          .get(urlBase)
          .then(function successCallback(response) {
            deferred.resolve(response.data.data);
          }, function errorCallback(response) {

            deferred.reject(response);
          });

        return deferred.promise;
      };

      return eventService;
    }]);
