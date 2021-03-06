'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .controller('UsersCtrl', ['usersFactory', 'subscriptionsFactory', '$scope', function UsersCtrl(usersFactory, subscriptionsFactory, $scope) {

    $scope.users = [];

    $scope.makePremium = function(user) {
      var subscription = {
        'user_id': user.id
      };
      var userIdx = $scope.users.indexOf(user);
      subscriptionsFactory.subscribe(subscription)
        .success(function(data) {
          $scope.users[userIdx] = data.data;
        })
        .error(function(error) {
          console.error(error);
        });
    };

    $scope.deletePremium = function(user) {
      var userIdx = $scope.users.indexOf(user);
      subscriptionsFactory.destroySubscription(user.subscription_id)
        .success(function() {
          user.is_premium = false;
          user.subscription_id = null;
          $scope.users[userIdx] = user;
        })
        .error(function(error) {
          console.error(error);
        });
    };

    usersFactory.getUsers()
      .success(function(data) {

        $scope.users = data;
      })
      .error(function(error) {
        console.error(error);
      });
  }]);
