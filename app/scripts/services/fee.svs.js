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
          id: 0,
          event_id: 0,
          name: 'first fee',
          price: 10,
          deadline: 'some deadline'
        },
        {
          id: 1,
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

      feeService.createFee = function(fee) {
        var def = $q.defer();
        var id = fees.length;
        fee.id = id;
        fees.push(fee);
        def.resolve(fee);
        return def.promise;
      };

      feeService.removeFee = function(fee_id) {
        var def = $q.defer();
        var feeFound = false;
        var res = [];
        for (var i = 0; i < fees.length; i++) {
          var currentFee = fees[i];
          if (currentFee.id !== fee_id) {
            res.push(currentFee);
          } else {
            feeFound = true;
          }
        }

        if (feeFound) {
          fees = res;
          def.resolve();
        } else {
          def.reject();
        }

        return def.promise;
      };

      return feeService;
    }]);
