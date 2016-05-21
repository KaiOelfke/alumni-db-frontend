'use strict';

/**
 * @ngdoc service
 * @name feeService
 *
 * @description TODO: Write description for feeService.
 */
angular
  .module('alumni-db-frontend')
  .service('feeService', [
    '$http',
    'API_HOST',
    'displayErrors',
    '$q', function($http, API_HOST, displayErrors, $q) {

      var urlBase = API_HOST + '/events/fees';
      var feeService = {};

      feeService.getFeesForEvent = function(event_id) {
        var deferred = $q.defer();
        $http
          .get(urlBase, {
            params: {
              'event_id': event_id
            }
          })
          .then(function successCallback(resp) {
              deferred.resolve(resp);
            },

            function errorCallback(response) {
              deferred.reject(displayErrors.convertErrorResponse(response));
            });

        return deferred.promise;
      };

      feeService.createFee = function(fee) {
        var deferred = $q.defer();
        $http
          .post(urlBase, {
            fee: fee
          })
          .then(function successCallback(resp) {
              deferred.resolve(resp);
            },

            function errorCallback(response) {
              deferred.reject(displayErrors.convertErrorResponse(response));
            });

        return deferred.promise;
      };

      feeService.showFee = function(fee_id) {
        var deferred = $q.defer();
        $http
          .get(urlBase + '/' + fee_id)
          .then(function successCallback(resp) {
              deferred.resolve(resp);
            },

            function errorCallback(response) {
              deferred.reject(displayErrors.convertErrorResponse(response));
            });

        return deferred.promise;
      };

      feeService.removeFee = function(fee_id) {
        var deferred = $q.defer();
        $http
          .delete(urlBase + '/' + fee_id)
          .then(function successCallback(resp) {
              deferred.resolve(resp);
            },

            function errorCallback(response) {
              deferred.reject(displayErrors.convertErrorResponse(response));
            });

        return deferred.promise;
      };

      feeService.editFee = function(fee_id, fee) {
        var deferred = $q.defer();
        $http
          .put(urlBase + '/' + fee_id, {
            fee: fee
          })
          .then(function successCallback(resp) {
              deferred.resolve(resp);
            },

            function errorCallback(response) {
              deferred.reject(displayErrors.convertErrorResponse(response));
            });

        return deferred.promise;
      };

      return feeService;
    }]);
