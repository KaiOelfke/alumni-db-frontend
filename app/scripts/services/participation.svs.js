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
        var eventKey = event_id + "";
        var deferred = $q.defer();
        if (!participations[eventKey]) {
          participations[eventKey] = [user_id];
          deferred.resolve();
        } else {
          if (participations[eventKey].indexOf(user_id) === -1) {
            participations[eventKey].push(user_id)
          } else {
            deferred.reject();
        }
        return deferred.promise;
      };

      return participationService;

    }]);
