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

    subscriptionsFactory.subscribe = function(subscription) {
      return $http.post(urlBase, {
        subscription: subscription
      });
    };

    subscriptionsFactory.destorySubscription = function(id) {
      return $http.delete(urlBase + '/' + id);
    };

    subscriptionsFactory.editSubscription = function(id, subscription) {
      return $http.put(urlBase + '/' + id, {
        subscription: subscription
      });
    };

    subscriptionsFactory.getSubscription = function(userId) {
      return $http.get(urlBase + '/' + userId);
    };

    return subscriptionsFactory;
  }]);
