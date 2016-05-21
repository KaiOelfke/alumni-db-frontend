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
    'displayErrors',
    '$q', function($http, API_HOST, displayErrors, $q) {

      var serializeEvent = function(event) {
        for (var key in event) {
          if (event[key] === '') {
            event[key] = null;
          }
        }

        return event;
      };

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
            event: serializeEvent(event)
          })
          .then(function successCallback(resp) {
            deferred.resolve(resp);
          }, function errorCallback(response) {

            deferred.reject(displayErrors.convertErrorResponse(response));
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

            deferred.reject(displayErrors.convertErrorResponse(response));
          });

        return deferred.promise;
      };

      eventService.editEvent = function(id, event) {
        var deferred = $q.defer();
        $http
          .put(urlBase + '/' + id, {
            event: serializeEvent(event)
          })
          .then(function successCallback(response) {
            deferred.resolve(response.data.data);
          }, function errorCallback(response) {

            deferred.reject(displayErrors.convertErrorResponse(response));
          });

        return deferred.promise;
      };

      eventService.removeEvent = function(event_id) {
        var deferred = $q.defer();
        $http
          .delete(urlBase + '/' + event_id)
          .then(function successCallback() {
            deferred.resolve();
          }, function errorCallback(response) {

            deferred.reject(displayErrors.convertErrorResponse(response));
          });

        return deferred.promise;
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

            deferred.reject(displayErrors.convertErrorResponse(response));
          });

        return deferred.promise;
      };

      eventService.getEventLogo = function() {
        return 'https://placeholdit.imgix.net/~text?txtsize=64&txt=event_logo&w=400&h=400';
      };

      eventService.getEventHeader = function() {
        return 'https://placeholdit.imgix.net/~text?txtsize=64&txt=event_header&w=800&h=200';
      };

      return eventService;
    }]);
