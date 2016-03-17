'use strict';

angular
  .module('alumni-db-frontend')
  .controller('searchCtrl', ['$scope', function($scope) {
    const search = function() {
      console.log('searching for', $scope.searchText);
    };

    $scope.searchText = 'default search text';
    $scope.search = search;
  }]);
