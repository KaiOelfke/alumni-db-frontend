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
  .controller('braintreeCtrl', ['braintreeService', '$state', '$scope', function(braintreeService, $state, $scope) {

    braintreeService
      .getClientToken()
      .then(function(clientToken) {
        console.log(clientToken);
        // Set up braintree dropin
        braintree.setup(clientToken, 'dropin', {
          container: 'payment-form',
          onPaymentMethodReceived: function(paymentData) {
            braintreeService
              .submitPayment(paymentData)
              .then(function() {
                console.log('Submitted payment successfully');
                $state.go('home.premium');
              });
          }
        });
      });

    $scope.title = 'Become a premium member!';

  }]);
