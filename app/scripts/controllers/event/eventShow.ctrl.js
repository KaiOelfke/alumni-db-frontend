'use strict';

/**
  * @ngdoc controller
  * @name eventShowCtrl
  * @requires $scope
  *
  * @description
  * TODO: Write description of this controller
  */
angular
  .module('alumni-db-frontend')
  .controller('eventShowCtrl', [
    'feeService',
    '$scope',
    'data',
    'toaster', function(feeService, $scope, data, toaster) {

      $scope.event = data.event;

      $scope.fees = data.fees;

      $scope.newFee = null;

      $scope.toggleCreateFeeMenu = function() {
        if ($scope.newFee) {
          $scope.newFee = null;
        } else {
          $scope.newFee = {};
        }
      };

      $scope.createFee = function(fee) {
        console.log('creating new fee', fee);
      };

    }]);
