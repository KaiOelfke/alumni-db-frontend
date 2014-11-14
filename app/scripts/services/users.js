'use strict';

/**
 * @ngdoc function
 * @name alumniWebApp.service:usersFactory
 * @description
 * # usersFactory
 * Controller of the alumniWebApp
 */
angular.module('alumniWebApp')
  .factory('usersFactory', ['$http','API_HOST', function ($http, API_HOST) {
        var urlBase = '//' + API_HOST + '/users';
        var usersFactory = {};


        usersFactory.getUsers = function  () {
            return $http.get(urlBase);
        };

        usersFactory.insertUser = function  (user) {
            return $http.post(urlBase, {user: user});
        };

        return usersFactory;
  }]);


