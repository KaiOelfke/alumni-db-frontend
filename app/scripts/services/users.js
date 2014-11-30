'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:usersFactory
 * @description
 * # usersFactory
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('usersFactory', ['$http','API_HOST', function ($http, API_HOST) {
        var urlBase =  API_HOST + '/users';
        var usersFactory = {};

        usersFactory.getUsers = function  () {
            return $http.get(urlBase);
        };

        usersFactory.insertUser = function  (user) {
            return $http.post(urlBase, {user: user});
        };

        return usersFactory;
  }]);


