'use strict';

/**
 * @ngdoc service
 * @name participationService
 *
 * @description TODO: Write description for participationService
 */
angular
  .module('alumni-db-frontend')
  .service('participationService', [
    '$http',
    'API_HOST',
    '$q', function($http, API_HOST, $q) {

      var participations = {};

      var participationService = {};

      participationService.createParticipation = function(event_id, user_id) {
        var deferred = $q.defer();
        var eventKey = event_id + "";
        if (!participations[eventKey]) {
          participations[eventKey] = [user_id];
          deferred.resolve();
        } else {
          if (participations[eventKey].indexOf(user_id) === -1) {
            participations[eventKey].push(user_id)
          } else {
            deferred.reject();
          }
        }
        return deferred.promise;
      };

      participationService.getParticipationsForEvent = function(event_id) {
        var deferred = $q.defer();
        var eventKey = event_id + "";
        if (participations.hasOwnProperty(eventKey)) {
          deferred.resolve(participations[eventKey])
        } else {
          deferred.reject();
        }
        return deferred.promise;
      };

      participationService.removeParticipation = function(event_id) {
        var deferred = $q.defer();
        var eventKey = event_id + "";
        if (participations.hasOwnProperty(eventKey)) {
          participations[eventKey] = null;
          deferred.resolve();
        } else {
          deferred.reject();
        }
        return deferred.promise;
      };

      return participationService;

    }]);
