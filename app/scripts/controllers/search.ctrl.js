'use strict';

/**
  * @ngdoc controller
  * @name searchCtrl
  * @requires $scope
  *
  * @description
  * The controller which provides search functionalities for the
  * alumniSearch directive.
  */
angular
  .module('alumni-db-frontend')
  .controller('searchCtrl', [
    'searchService',
    '$scope', function(searchService, $scope) {

      const search = function() {
        console.log('trying to search for', $scope.searchText);
        searchService.userSearch($scope.searchText)
          .then(function successCallback(response) {
            console.log('search was successfull', response);
          }, function errorCallback(response) {

            console.log('search failed', response);
          });
      };

      /**
       * Stores the search text input.
       * @type {String}
       */
      $scope.searchText = '';

      /**
       * Tries to execute a search request with the value stores in
       * $scope.searchText.
       * @type {function}
       */
      $scope.search = search;
    }]);
