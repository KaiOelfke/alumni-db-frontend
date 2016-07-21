'use strict';

/**
 * @ngdoc service
 * @name codeService
 *
 * @description TODO: Write description for codeService.
 */
angular
  .module('alumni-db-frontend')
  .service('codeService', [
    '$http',
    'API_HOST',
    'displayErrors',
    '$q', function($http, API_HOST, displayErrors, $q) {

      var urlBase = API_HOST + '/fee_codes';
      var codeService = {};

      codeService.getCodesForEvent = function(event_id) {
        var deferred = $q.defer();
        var url = API_HOST + '/events/' + event_id + '/fee_codes';
        $http
          .get(url)
          .then(function successCallback(resp) {
              deferred.resolve(resp.data.data);
            },

            function errorCallback(response) {
              deferred.reject(displayErrors.convertErrorResponse(response));
            });

        return deferred.promise;
      };

      codeService.createCode = function(user_id, fee_id) {
        var deferred = $q.defer();
        $http
          .post(urlBase, {
            fee_code: {
              user_id: user_id,
              fee_id: fee_id  
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

      codeService.showCode = function(code_id) {
        var deferred = $q.defer();
        $http
          .get(urlBase + '/' + code_id)
          .then(function successCallback(resp) {
              deferred.resolve(resp);
            },

            function errorCallback(response) {
              deferred.reject(displayErrors.convertErrorResponse(response));
            });

        return deferred.promise;
      };

      codeService.removeCode = function(code_id) {
        var deferred = $q.defer();
        $http
          .delete(urlBase + '/' + code_id)
          .then(function successCallback(resp) {
              deferred.resolve(resp);
            },

            function errorCallback(response) {
              deferred.reject(displayErrors.convertErrorResponse(response));
            });

        return deferred.promise;
      };

      // codeService.editCode = function(code_id, code) {
      //   var deferred = $q.defer();
      //   $http
      //     .put(urlBase + '/' + code_id, {
      //       code: code
      //     })
      //     .then(function successCallback(resp) {
      //         deferred.resolve(resp);
      //       },

      //       function errorCallback(response) {
      //         deferred.reject(displayErrors.convertErrorResponse(response));
      //       });

      //   return deferred.promise;
      // };

      return codeService;
    }]);
