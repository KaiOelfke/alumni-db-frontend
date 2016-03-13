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
  .controller('planCtrl', ['plansFactory', '$state',  '$rootScope', '$scope', function(plansFactory, $state, $rootScope, $scope) {

    $scope.title = 'Become a premium member!';
    $scope.tmpPlanFormVisible = false;
    $scope.tmpPlan = {};

    plansFactory
      .getAllPlans()
      .then(function(plansResponse) {
        $scope.plans = plansResponse.data;
        $scope.defaultPlan = getDefaultPlan($scope.plans);
      }, function() {

        console.error('Could not get plans');
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

    $scope.newPlan = function() {
      $scope.formDescription = 'Enter the data for the new plan';
      $scope.tmpPlanFormVisible = true;
      $scope.tmpPlan = {};
    };

    $scope.editPlan = function(plan) {
      $scope.formDescription = 'Change the data for the existing plan';
      $scope.tmpPlanFormVisible = true;
      $scope.tmpPlan = angular.copy(plan);
    };

    $scope.savePlan = function(tmpPlan) {
      $scope.tmpPlanFormVisible = false;
      $scope.tmpPlan = {};
      if (tmpPlan.default === null)
      {
        tmpPlan.default = false;
      }

      if (tmpPlan.id) {
        plansFactory.editPlan(tmpPlan.id, tmpPlan)
        .success(function() {
          var idx = -1;

          for (var i = 0; i < $scope.plans.length; i++) {
            if ($scope.plans[i].id === tmpPlan.id) {
              idx = i;
            }
          }

          $scope.plans[idx] = tmpPlan;
        })
        .error(function(error) {
          console.error(error);
        });
      } else {
        plansFactory.insertPlan(tmpPlan)
        .success(function(data) {
          $scope.plans.push(data.data);
        })
        .error(function(error) {
          console.error(error);
        });
      }
    };

    $scope.deletePlan = function(plan) {
      $scope.tmpPlanFormVisible = false;
      $scope.tmpPlan = {};
      var idx = $scope.plans.indexOf(plan);
      plansFactory.destroyPlan(plan.id)
      .success(function() {
        plan.delete_flag = true;
        $scope.plans[idx] = plan;
      })
      .error(function(error) {
        console.error(error);
      });
    };

  }]);
