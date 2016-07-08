'use strict';

// TODO: put all error messages in a seperate factory and get them from there

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
  .controller('braintreeCtrl', ['braintreeService', 'data', 'plansFactory', '$state', '$rootScope', '$scope', 'toaster', function(braintreeService, data, plansFactory, $state, $rootScope, $scope, toaster) {

    $scope.paymentErrors = [];
    $scope.title = 'Become a premium member!';
    $scope.braintreeReady = false;
    $scope.processingPayment = false;

    $scope.event = data.event;

    plansFactory
      .getAllPlans()
      .then(function(plansResponse) {
        $scope.plans = plansResponse.data;
        $scope.defaultPlan = getDefaultPlan($scope.plans);
      }, function errorCallback(response) {

        toaster.pop('error', 'Internal application error. Please contact the developers.');
        console.error('could not get plans', response);
      });

    braintreeService
      .getClientToken()
      .then(function successCallback(clientToken) {
        // Set up braintree dropin
        braintree.setup(clientToken, 'dropin', {
          container: 'payment-form',
          onPaymentMethodReceived: finishPaymentProcess,
          onReady: function() {
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
      }, function errorCallback(response) {

        toaster.pop('error', 'Internal application error. Please contact the developers.');
        console.error('could not get client token', response);
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
          .then(function successCallback(response) {
            console.log('Submitted payment successfully');

            // should be wrapped with somewhere else
            var updatedUser = response.data.data;
            angular.extend($rootScope.user, updatedUser);
            $rootScope.user.statuses.push('premium');
            $state.go('home.premium');
            $scope.processingPayment = false;
          }).catch(function(response) {
            $scope.paymentErrors = response.data.errors;

            processError(response);
            console.error('could not submit payment', response);
            $scope.processingPayment = false;
          });
      } else {
        console.log('Setting processing flag to false');
        $scope.processingPayment = false;
        $scope.$digest();
      }
    };

    var processError = function(response) {
      // console.error the response first
      console.error('an error occurred', response);

      // extract error message for the user
      var errorMessage = response.statusText;
      if (response.data.hasOwnProperty('errors')) {
        if (response.data.errors.length > 0) {
          errorMessage = '';
          for (var i = 0; i < response.data.errors.length; i++) {
            var msg = response.data.errors[i];
            errorMessage += msg.message + ', ';
          }

          errorMessage = errorMessage.substring(0, errorMessage.length - 2);
        }
      }

      // display the human readable error message
      toaster.pop('error', errorMessage);
    };

  }]);
