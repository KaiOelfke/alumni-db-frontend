'use strict';

/**
  * @ngdoc controller
  * @name searchCtrl
  * @requires $scope
  *
  * @description
  * A controller which provides search functionalities for the
  * alumniSearch directive.
  */
angular
  .module('alumni-db-frontend')
  .controller('searchCtrl', ['$scope', function($scope) {
    const search = function() {
      console.log('searching for', $scope.searchText);
    };

    $scope.searchText = '';
    $scope.search = search;
  }]);
