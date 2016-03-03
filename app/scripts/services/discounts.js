'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:discountsFactory
 * @description
 * # discountsFactory
 * Factory of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('discountsFactory', ['$http', 'API_HOST', function($http, API_HOST) {
    var urlBase = API_HOST + '/subscriptions/discounts';
    var discountsFactory = {};

    discountsFactory.insertDiscount = function(discount) {
      return $http.post(urlBase, {
        discount: discount
      });
    };

    discountsFactory.destoryDiscount = function(id) {
      return $http.delete(urlBase + '/' + id);
    };

    discountsFactory.editDiscount = function(id, discount) {
      return $http.put(urlBase + '/' + id, {
        discount: discount
      });
    };

    discountsFactory.getDiscount = function(id) {
      return $http.get(urlBase + '/' + id);
    };

    discountsFactory.checkCode = function(id, planId, codeId) {
      /*jshint camelcase: false */
      return $http.get(urlBase + '/check', {
        params: {
            plan_id: planId,
            code_id: codeId
        }
     })
    };


    return discountsFactory;
  }]);
