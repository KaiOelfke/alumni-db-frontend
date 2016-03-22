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
        feeService
          .getFeesForEvent($scope.event.id)
          .then(function successCallback(fees) {
            console.log('received new fees', fees);
            $scope.fees = fees;
          }, function errorCallback() {

            $scope.fees = [];
          });
      };

      $scope.event = data.event;

      $scope.fees = data.fees;

      $scope.newFee = null;

      $scope.feeToEdit = null;

      $scope.clearFeeForm = function() {
        $scope.newFee = {};
      };

      $scope.toggleCreateFeeView = function() {
        if ($scope.newFee) {
          $scope.newFee = null;
        } else {
          $scope.newFee = {};
        }
      };

      $scope.toggleEditFeeView = function(fee) {
        if ($scope.feeToEdit) {
          $scope.feeToEdit = null;
        } else {
          $scope.feeToEdit = angular.extend({}, fee);
        }
      };

      $scope.createFee = function(fee) {
        fee.event_id = $scope.event.id;
        feeService
          .createFee(fee)
          .then(function successCallback() {
            toaster.pop('success', 'successfully created fee');
            $scope.clearFeeForm();
            $scope.toggleCreateFeeView();
            refreshFees();
          }, function errorCallback(error) {

            toaster.pop('error', error);
          });
      };

      $scope.removeFee = function(fee) {
        console.log('removing fee', fee);
        feeService
          .removeFee(fee.id)
          .then(function successCallback() {
            toaster.pop('success', 'successfully removed fee');
            refreshFees();
          }, function errorCallback(error) {

            toaster.pop('error', error);
          });
      };

      $scope.editFee = function(fee) {
        feeService
          .editFee(fee.id, fee)
          .then(function successCallback() {
            toaster.pop('success', 'fee successfully edited');
            $scope.toggleEditFeeView();
            refreshFees();
          }, function errorCallback(error) {

            toaster.pop('error', error);
          });
        console.log('should edit fee', fee);
      };

    }]);
