'use strict';

/**
  * @ngdoc service
  * @name braintreeService
  * @requires $q
  *
  * @description
  * TODO
  */
angular
  .module('alumni-db-frontend')
  .service('braintreeService', ['$q', '$http', 'API_HOST', 'subscriptionsFactory', function($q, $http, API_HOST, subscriptionsFactory) {
    var clientTokenUrl = API_HOST + '/subscriptions/client_token';

    var braintreeService = {};

    /**
      * @ngdoc function
      * @name braintreeService#getClientToken
      * @methodOf braintreeService
      *
      * @description
      * TODO
      *
      * @returns {Object}
      * TODO
      */
    braintreeService.getClientToken = function() {

      var def = $q.defer();
      $http.get(clientTokenUrl).then(function(clientTokenResponse) {
        if (clientTokenResponse.status !== 200) {
          def.reject(new Error('cann\'t get clienttoken'));
          return;
        }

        def.resolve(clientTokenResponse.data.clientToken);
      });

      return def.promise;
    };

    /**
      * @ngdoc function
      * @name braintreeService#submitPayment
      * @methodOf braintreeService
      *
      * @description
      * TODO
      *
      * @param {Object}
      * TODO
      *
      * @returns {Object}
      * TODO
      */
    braintreeService.submitPayment = function(paymentData) {
      /*jshint camelcase: false */

      return subscriptionsFactory.subscribe({
        payment_method_nonce: paymentData.nonce,
        user_id: paymentData.userId
      });
    };

    return braintreeService;
  }]);
