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
    '$q', function($http, API_HOST, $q) {

      var fees = [
        {
          event_id: 0,
          name: 'first fee',
          price: 10,
          deadline: 'some deadline'
        },
        {
          event_id: 1,
          name: 'second fee',
          price: 20,
          deadline: 'some other deadline'
        }
      ];

      // var urlBase = API_HOST + '/fee';
      var feeService = {};

      feeService.getFeesForEvent = function(event_id) {
        var def = $q.defer();
        var res = [];
        for (var i = 0; i < fees.length; i++) {
          var currentFee = fees[i];
          if (currentFee.event_id === event_id) {
            res.push(currentFee);
          }
        }

        if (res.length > 0) {
          def.resolve(res);
        } else {
          def.reject('No fees found for event_id ' + event_id);
        }

        return def.promise;
      };

      return feeService;
    }]);
