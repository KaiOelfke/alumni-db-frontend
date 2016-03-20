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
       * Since the search requests have to be paginated we keep track of
       * the pages with this variable.
       * @type {Number}
       */
      var currentPage = 1;

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

      /**
       * If called it should revert back to the default view and clear all
       * previous search results.
       * @type {function}
       */
      $scope.resetSearch;

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
        searchService.userSearch($scope.searchText, currentPage)
          .then(function successCallback(response) {
            console.log('search was successfull', response);
            $scope.showResults = true;
            if (angular.isArray($scope.searchResults)) {
              $scope.searchResults = $scope.searchResults.concat(response.data);
            } else {
              $scope.searchResults = response.data;
            }
          }, function errorCallback(response) {
            // TODO: Display error message with toasters
            console.log('search failed', response);
          });
      };

      $scope.resetSearch = function() {
        $scope.showResults = false;
        $scope.searchResults = null;
        currentPage = 1;
      };

      /**
       * If there was a previous search this function tries to get
       * results of the next page and tries to append the new results
       * to the previous ones.
       */
      var searchNextPage = function() {
        if ($scope.showResults) {
          // execute this only if there was a search before
          currentPage += 1;
          $scope.search();
        }
      };

      // if the user has scrolled to the bottom of the page
      $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          searchNextPage();
        }
      });
    }]);
