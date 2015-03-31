'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:memebershipsFactory
 * @description
 * # memebershipsFactory
 * Factory of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('memebershipsFactory', ['$http','API_HOST', function ($http, API_HOST) {
        var urlBase =  API_HOST + '/memberships';
        var memebershipsFactory = {};


        memebershipsFactory.insertMembership = function  (membership) {
            return $http.post(urlBase, {membership: membership});
            };

        memebershipsFactory.destoryMembership = function(id) {
            return $http.delete(urlBase + '/' + id);
            };            

        memebershipsFactory.editMembership = function(id, membership) {
            return $http.put(urlBase + '/' + id, {membership: membership});
            };

        memebershipsFactory.getMembership = function(id) {
            return $http.get(urlBase + '/' + id);
            };

        return memebershipsFactory;
  }]);


