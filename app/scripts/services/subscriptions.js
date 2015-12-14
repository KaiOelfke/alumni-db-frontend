'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:subscriptionsFactory
 * @description
 * # subscriptionsFactory
 * Factory of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('subscriptionsFactory', ['$http', 'API_HOST', function($http, API_HOST) {
    var urlBase = API_HOST + '/subscriptions';
    var subscriptionsFactory = {};

    subscriptionsFactory.subscribe = function(membership) {
      return $http.post(urlBase, {
        membership: membership
      });
    };

    subscriptionsFactory.destorySubscription = function(id) {
      return $http.delete(urlBase + '/' + id);
    };

    subscriptionsFactory.editSubscription = function(id, membership) {
      return $http.put(urlBase + '/' + id, {
        membership: membership
      });
    };

    subscriptionsFactory.getSubscription = function(id) {
      return $http.get(urlBase + '/' + id);
    };

    return subscriptionsFactory;
  }]);
