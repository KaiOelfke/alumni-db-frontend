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

      // Ideally this should return a fee to pay if the code was valid
      codeService.validateCode = function(event_id, user_id, code_input) {
        var deferred = $q.defer();
        // $http
        //   .post('codeValidation', {
        //     event_id: event_id,
        //     user_id: user_id,
        //     code_input: code_input
        //   })
        //   .then(function successCallback(resp) {
        //     deferred.resolve(resp);
        //   },
        //
        //   function errorCallback(response) {
        //     deferred.reject(displayErrors.convertErrorResponse(response));
        //   });
        console.log('Returning fake fee for arguments', event_id, user_id, code_input);
        deferred.resolve({
          id: 101,
          event_id: event_id,
          name: 'Fake fee',
          price: 10,
          deadline: '01.01.2017',
          is_early_bird_fee: true,
          is_honoris_fee: false
        });
        return deferred.promise;
      };

      return codeService;

    }]);
