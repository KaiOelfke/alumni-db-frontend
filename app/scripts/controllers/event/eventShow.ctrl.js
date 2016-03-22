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

      var refreshFees = function() {
        console.log('refreshing fees');
        feeService
          .getFeesForEvent($scope.event.id)
          .then(function successCallback(fees) {
            console.log('received new fees', fees);
            $scope.fees = fees;
          }, function errorCallback(error) {
            // TODO: Use toaster for this
            console.error(error);
          });
      };

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
        fee.event_id = $scope.event.id;
        feeService
          .createFee(fee)
          .then(function successCallback() {
            // TODO: Use toaster for this
            console.log('successfully created fee');
            // TODO: clear form
            refreshFees();
          }, function errorCallback(error) {
            // TODO: Use toaster for this
            console.error(error);
          });
      };

    }]);
