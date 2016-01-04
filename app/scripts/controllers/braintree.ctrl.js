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
  .controller('braintreeCtrl', ['braintreeService', '$state',  '$rootScope', '$scope',
   function(braintreeService, $state, $rootScope, $scope) {

    braintreeService
      .getClientToken()
      .then(function(clientToken) {
        // Set up braintree dropin
        braintree.setup(clientToken, 'dropin', {
          container: 'payment-form',
          onPaymentMethodReceived: function(paymentData) {
            paymentData.userId = $rootScope.user.id;
            braintreeService
              .submitPayment(paymentData)
              .then(function(response) {
                console.log('Submitted payment successfully');
                // should be wrapped with somewhere else
                var updatedUser = response.data.data;
                angular.extend($rootScope.user, updatedUser);
                $rootScope.user.statuses.push('premium');

                $state.go('home.premium');
              });
          }
        });
      });

    $scope.title = 'Become a premium member!';

  }]);
