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
    'usersFactory',
    'searchService',
    '$scope', function(usersFactory, searchService, $scope) {

      /**
       * Stores the search text input.
       * @type {String}
       */
      $scope.searchText = '';

      /**
       * The results of the search requests will be saved here.
       * @type {Array.<Object>}
       */
      $scope.searchResults;

      /**
       * If showResults is false the default view should be shown.
       * If showResults is true the results should be shown.
       * @type {Boolean}
       */
      $scope.showResults = false;

      /**
       * Per default this controller will try to get all users and display
       * them. TODO: Do this only if an option has been set.
       */
      $scope.allUsers;

      /**
       * Tries to execute a search request with the value stores in
       * $scope.searchText.
       * @type {function}
       */
      $scope.search;

      // Initialize variables

      usersFactory
        .getUsers()
        .then(function successCallback(response) {
          console.log('received all users', response.data);
          $scope.allUsers = response.data;
        }, function errorCallback(response) {
          // TODO: Display error message with toaster
          console.error('could not get all users', response);
        });

      $scope.search = function() {
        console.log('trying to search for', $scope.searchText);
        searchService.userSearch($scope.searchText)
          .then(function successCallback(response) {
            console.log('search was successfull', response);
            $scope.showResults = true;
            $scope.searchResults = response.data;
          }, function errorCallback(response) {
            // TODO: Display error message with toasters
            console.log('search failed', response);
          });
      };
    }]);
