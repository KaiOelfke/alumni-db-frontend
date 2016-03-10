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

    $scope.title = 'Become a premium member!';
    $scope.braintreeReady = false;
    $scope.processingPayment = false;

    plansFactory
      .getAllPlans()
      .then(function(plansResponse) {
        $scope.plans = plansResponse.data;
        $scope.defaultPlan = getDefaultPlan($scope.plans);
      }, function() {

        console.error('Could not get plans');
        window.alert('Ups, there was an error! Please refresh the website or contact a developer for assistance.');
      });

    braintreeService
      .getClientToken()
      .then(function(clientToken) {
        // Set up braintree dropin
        braintree.setup(clientToken, 'dropin', {
          container: 'payment-form',
          onPaymentMethodReceived: finishPaymentProcess,

          onReady: function(integration) {
            $scope.$apply(function() {
              $scope.braintreeReady = true;
            });
          },

          onError: function(error) {
            console.log('an error occurred');
            console.error(error);
            finishPaymentProcess();
          },
        });
      }, function() {

        console.error('Could not get client token');
        window.alert('Ups, there was an error! Please refresh the website or contact a developer for assistance.');
      });

    var getDefaultPlan = function(plans) {
      for (var i = 0; i < plans.length; i++) {
        var plan = plans[i];
        if (plan.default) {
          return plan;
        }
      }
    };

    $scope.processPayment = function() {
      $scope.processingPayment = true;
      return true;
    };

    var finishPaymentProcess = function(paymentData) {
      if (paymentData) {
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

            $scope.processingPayment = false;
          }, function() {

            console.error('Something went wrong with braintreeService.submitPayment');
            $scope.processingPayment = false;
          });
      } else {
        console.log('Setting processing flag to false');
        $scope.processingPayment = false;
        $scope.$digest();
      }
    };

  }]);
