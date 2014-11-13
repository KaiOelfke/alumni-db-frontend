'use strict';

/**
 * @ngdoc function
 * @name alumniWebApp.service:usersFactory
 * @description
 * # usersFactory
 * Controller of the alumniWebApp
 */
angular.module('alumniWebApp')
  .factory('usersFactory', ['$http', function ($http) {
        var urlBase = 'http://localhost:3000/users';

        var usersFactory = {};


        usersFactory.getUsers = function  () {
            return $http.get(urlBase);
        };

        usersFactory.insertUser = function  (user) {
            return $http.post(urlBase, {user: user});
        };



        return usersFactory;
  }]);


