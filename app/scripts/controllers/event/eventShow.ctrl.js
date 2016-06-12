'use strict';

// TODO: get participation for current user and this event
// to show either Enter button or Leave button

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
    'eventService',
    'feeService',
    'braintreeService',
    'participationService',
    'eventImagesFactory',
    '$rootScope',
    '$scope',
    '$stateParams',
    'data',
    'toaster', function(eventService, feeService, braintreeService, participationService, eventImagesFactory, $rootScope, $scope, $stateParams, data, toaster) {

      $scope.eventId = $stateParams.id;

      var refreshFees = function() {
        feeService
          .getFeesForEvent($scope.event.id)
          .then(function successCallback(fees) {
            $scope.fees = fees;
          }, function errorCallback() {

            $scope.fees = [];
          });
      };

      var refreshEvent = function() {
        eventService
          .getEvent($scope.event.id)
          .then(function successCallback(event) {
            $scope.event = event;
          }, function errorCallback(error) {

            toaster.pop('error', error);
          });
      };

      $scope.event = data.event;

      $scope.fees = data.fees;

      $scope.newFee = null;

      $scope.editedEvent = null;

      $scope.feeToEdit = null;

      $scope.logoUploadingStatus = null;

      $scope.logoUploadSuccess = false;

      $scope.logoUploadError = false;

      $scope.headerUploadingStatus = null;

      $scope.headerUploadSuccess = false;

      $scope.headerUploadError = false;

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

      $scope.toggleEditEventView = function() {
        if ($scope.editedEvent) {
          $scope.editedEvent = null;
        } else {
          $scope.editedEvent = angular.extend({}, $scope.event);
        }
      };

      $scope.createFee = function(fee) {
        fee.event_id = $scope.event.id;
        feeService
          .createFee(fee)
          .then(function successCallback() {
            toaster.pop('success', 'successfully created fee');
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
      };

      $scope.editEvent = function(event) {
        eventService
          .editEvent(event.id, event)
          .then(function successCallback() {
            toaster.pop('success', 'event successfully edited');
            $scope.toggleEditEventView();
            refreshEvent();
          }, function errorCallback(error) {

            toaster.pop('error', error);
          });
      };

      $scope.logoFileSelected = function(file) {
        console.log('File selected:', file);
        eventImagesFactory.uploadLogo(file).then(function(data) {
          console.log('event logo uploaded:', data);
          $scope.logoUploadError = false;
          $scope.logoUploadSuccess = true;
        }, function(errorObject) {

          $scope.uploadingStatus = undefined;
          console.error('event logo upload failed:', errorObject);
          $scope.logoUploadError = true;
          $scope.logoUploadingStatus = false;
        }, function(progress) {

          $scope.logoUploadingStatus = 'uploading: ' + progress + '%';
          console.log('event logo upload progress:', progress);
        });
      };

      $scope.headerFileSelected = function(file) {
        console.log('File selected:', file);
        eventImagesFactory.uploadHeader(file).then(function(data) {
          console.log('event logo uploaded:', data);
          $scope.headerUploadError = false;
          $scope.headerUploadSuccess = true;
        }, function(errorObject) {

          $scope.headerUploadingStatus = undefined;
          console.error('event logo upload failed:', errorObject);
          $scope.headerUploadError = true;
          $scope.headerUploadSuccess = false;
        }, function(progress) {

          $scope.headerUploadingStatus = 'uploading: ' + progress + '%';
          console.log('event logo upload progress:', progress);
        });
      };

      $scope.getEventLogo = function(event) {
        return eventService.getEventLogo(event);
      };

      $scope.getEventHeader = function(event) {
        return eventService.getEventHeader(event);
      };

    }]);
