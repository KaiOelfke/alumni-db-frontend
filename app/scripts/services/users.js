'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:usersFactory
 * @description
 * # usersFactory
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('usersFactory', ['$http', 'API_HOST', '$q', 'subscriptionsFactory', function($http, API_HOST, $q, subscriptionsFactory) {
    var urlBase = API_HOST + '/users';
    var usersFactory = {};

    usersFactory.getUsers = function() {
      return $http.get(urlBase);
    };

    usersFactory.insertUser = function(user) {
      return $http.post(urlBase, {
        user: user
      });
    };

    usersFactory.getUser = function(id) {
      return $http.get(urlBase + '/' + id);
    };

    usersFactory.getUserMemberships = function(id) {
      return $http.get(urlBase + '/' + id + '/memberships');
    };

    usersFactory.makePremium = function(user) {
      var def = $q.defer();
      var subscription = {
        'user_id': user.id
      };
      subscriptionsFactory
        .subscribe(subscription)
        .then(function successCallback(response) {
          def.resolve(response.data.data); // return user data
        }, function errorCallback(response) {
          def.reject(response);
        });
      return def.promise;
    };

    usersFactory.deletePremium = function(user) {
      var def = $q.defer();
      subscriptionsFactory
        .destroySubscription(user.subscription_id)
        .then(function successCallback() { // ignore response
          user.is_premium = false;
          user.subscription_id = null;
          def.resolve(user);
        }, function errorCallback(response) {
          def.reject(response);
        });
      return def.promise;
    };

    return usersFactory;
  }]);
