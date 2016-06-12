'use strict';

angular
  .module('alumni-db-frontend')
  .controller('participationCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    'eventService',
    'feeService',
    'codeService',
    'attachmentFactory',
    'displayErrors', function($rootScope, $scope, $state, $stateParams, eventService, feeService, codeService, attachmentFactory, displayErrors) {

      $scope.eventId = $stateParams.id;

      $scope.event;

      $scope.enteredCode = null;

      $scope.newApplication = {};

      $scope.cvUploadingStatus = null;

      $scope.cvUploadSuccess = false;

      $scope.cvUploadError = false;

      $scope.cvFileSelected

      $scope.toggleEnterCodeView = function() {
        if ($scope.enteredCode) {
          $scope.enteredCode = null;
        } else {
          $scope.enteredCode = {};
        }
      };

      $scope.enterCode = function() {
        console.log('entered code', $scope.enteredCode);
      };

      $scope.createCode = function() {
        codeService
          .createCode($scope.newCode)
          .then(
            function successCallback() {
              console.log('success');
            },

            // TODO: use toaster for displaying this error message
            function errorCallback(response) {
              console.error(displayErrors.convertErrorResponse(response));
            }
          );
      };

      $scope.clearApplicationForm = function() {
        $scope.newApplication = {};
      };

      $scope.apply = function() {
        var request = {
          userId: $rootScope.user.id
        };
        request = angular.extend(request, $scope.newApplication);
        console.log('need to apply with object', request);
      };

      $scope.cvFileSelected = function(file) {
        console.log('File selected:', file);
        attachmentFactory.uploadFile(file).then(function(data) {
          console.log('cv file uploaded:', data);
          $scope.cvUploadError = false;
          $scope.cvUploadSuccess = true;
        }, function(errorObject) {

          $scope.cvUploadingStatus = undefined;
          console.error('cv upload failed:', errorObject);
          $scope.cvUploadError = true;
          $scope.cvUploadSuccess = false;
        }, function(progress) {

          $scope.cvUploadingStatus = 'uploading: ' + progress + '%';
          console.log('cv upload progress:', progress);
        });
      };

      eventService
        .getEvent($scope.eventId)
        .then(
          function successCallback(event) {
            $scope.event = event;
          },

          // TODO: use toaster for displaying this error message
          function errorCallback(response) {
            console.error(displayErrors.convertErrorResponse(response));
          }
        );

    }]);
