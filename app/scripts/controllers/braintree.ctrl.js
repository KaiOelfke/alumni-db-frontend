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
  .controller('braintreeCtrl', ['braintreeService', 'plansFactory', '$state',  '$rootScope', '$scope', function(braintreeService, plansFactory, $state, $rootScope, $scope) {

    $scope.braintreeReady = false;
    var getDefaultPlan = function(plans) {
      for (var i = 0; i < plans.length; i++) {
        var plan = plans[i];
        if (plan.default) {
          return plan;
        }
      }
    };

    plansFactory
      .getAllPlans()
      .then(function(plansResponse) {
        $scope.plans = plansResponse.data;
        $scope.defaultPlan = getDefaultPlan($scope.plans);
      });

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
          },

          onReady: function(integration) {
            $scope.$apply(function() {
              $scope.braintreeReady = true;
            });
          },

          onError: function(error) {
            console.error(error);
          },
        });
      });

    $scope.title = 'Become a premium member!';

  }]);
