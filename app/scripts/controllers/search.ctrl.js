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
      $scope.searchResults = null;

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
      $scope.allUsers = null;

      /**
       * Tries to execute a search request with the value stores in
       * $scope.searchText.
       * @type {function}
       */
      $scope.search = null;

      /**
       * If called it should revert back to the default view and clear all
       * previous search results.
       * @type {function}
       */
      $scope.resetSearch = null;

      // Initialize variables

      usersFactory
        .getUsers()
        .then(function successCallback(response) {
          // console.log('received all users', response.data);
          $scope.allUsers = response.data;
        }, function errorCallback(response) {
          // TODO: Display error message with toaster
          console.error('could not get all users', response);
        });

      $scope.search = function(forNextPage) {
        var page = 1;
        if (forNextPage) {
          page = currentPage;
        }

        // console.log('trying to search for', $scope.searchText, 'with page', page);
        searchService.userSearch($scope.searchText, page)
          .then(function successCallback(response) {

            // console.log('search was successfull', response);
            $scope.showResults = true;
            if (forNextPage) {
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
        $scope.searchText = '';
        $scope.showResults = false;
        $scope.searchResults = null;
        currentPage = 1;
      };

      /**
       * If there was a previous search this function tries to get
       * results for the next page and tries to append the new results
       * to the previous ones.
       */
      var searchNextPage = function() {
        if ($scope.showResults) {
          // execute this only if there was a search before
          currentPage += 1;
          $scope.search(true); // apending results is handled there
        }
      };

      // if the user has scrolled to the bottom of the page
      $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
          searchNextPage();
        }
      });
    }]);
