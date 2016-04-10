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
          .then(function successCallback(resp) {
            console.log('response', resp);
            deferred.resolve(resp);
          }, function errorCallback(response) {

            // TODO: figure out what to pass as an error message
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

            // TODO: figure out what to pass as an error message
            deferred.reject(response);
          });

        return deferred.promise;
      };

      eventService.editEvent = function(id, event) {
        var deferred = $q.defer();
        $http
          .put(urlBase + '/' + id, {
            event: event
          })
          .then(function successCallback(response) {
            deferred.resolve(response.data.data);
          }, function errorCallback(response) {

            // TODO: figure out what to pass as an error message
            deferred.reject(response);
          });

        return deferred.promise;
      };

      eventService.removeEvent = function(event_id) {
        var deferred = $q.defer();
        $http
          .delete(urlBase + '/' + event_id)
          .then(function successCallback(response) {
            console.log('delete success', response);
            deferred.resolve();
          }, function errorCallback(response) {

            // TODO: figure out what to pass as an error message
            deferred.reject(response);
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

            deferred.reject(response);
          });

        return deferred.promise;
      };

      return eventService;
    }]);
