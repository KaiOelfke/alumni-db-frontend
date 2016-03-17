'use strict';

/**
 * @ngdoc service
 * @name searchService
 *
 * @description A service which provides different functions to interact
 * with the backend search API.
 */
angular
  .module('alumni-db-frontend')
  .service('searchService', ['$http', 'API_HOST', function($http, API_HOST) {
    const urlBase = API_HOST + '/search';
    var searchService = {};

    /**
     * Executes a simple search for a user by a given text without any filters.
     * @param  {string} searchText The search text to use.
     * @return {Object}            A promise object returned bei the $http
     *                             service.
     */
    searchService.userSearch = function(searchText) {
      return $http.get(urlBase, {
        params: {
          text: searchText
        }
      });
    };

    return searchService;
  }]);
