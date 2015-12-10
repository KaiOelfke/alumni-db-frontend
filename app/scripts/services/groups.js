'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:groupsFactory
 * @description
 * # groupsFactory
 * Factory of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('groupsFactory', ['$http', 'API_HOST', function($http, API_HOST) {
    var urlBase = API_HOST + '/groups';
    var groupsFactory = {};

    groupsFactory.getUsers = function(id) {
      return $http.get(urlBase + '/' + id + '/users');
    };

    groupsFactory.getGroups = function() {
      return $http.get(urlBase);
    };

    groupsFactory.insertGroup = function(group) {
      return $http.post(urlBase, {
        group: group
      });
    };

    groupsFactory.destoryGroup = function(id) {
      return $http.delete(urlBase + '/' + id);
    };

    groupsFactory.editGroup = function(id, group) {
      return $http.put(urlBase + '/' + id, {
        group: group
      });
    };

    groupsFactory.getGroup = function(id) {
      return $http.get(urlBase + '/' + id);
    };

    return groupsFactory;
  }]);
