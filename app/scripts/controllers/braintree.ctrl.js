'use strict';

/**
  * @ngdoc controller
  * @name braintreeCtrl
  * @requires $scope
  *
  * @description
  * TODO
  */
angular
  .module('alumni-db-frontend')
  .controller('braintreeCtrl', ['braintreeService', '$scope', function(braintreeService, $scope) {

    braintreeService
      .getClientToken()
      .then(function(clientToken) {

        // Set up braintree dropin
        braintree.setup(clientToken, 'dropin', {
          container: 'payment-form',
          onPaymentMethodReceived: function(paymentData) {
            braintreeService
              .submitPayment(paymentData)
              .then(function() {
                console.log('Submitted payment successfully');
              });
          }
        });
      });

    $scope.title = 'Become a premium member!';

  }]);
