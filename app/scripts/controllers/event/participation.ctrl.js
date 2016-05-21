'use strict';

angular
  .module('alumni-db-frontend')
  .controller('participationCtrl', [
    '$scope',
    '$state',
    '$stateParams', function($scope, $state, $stateParams) {

      $scope.eventId = $stateParams.id;

    }]);
