'use strict';

angular
  .module('alumni-db-frontend')
  .controller('searchCtrl', ['$scope', function($scope) {
    const search = function() {
      console.log('searching for', $scope.searchText);
    };

    $scope.searchText = '';
    $scope.search = search;
  }]);
