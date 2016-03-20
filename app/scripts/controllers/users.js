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

    $scope.makePremium = function(users, user) {
      var userIdx = users.indexOf(user);
      usersFactory
        .makePremium(user)
        .then(function successCallback(user) {
          console.log('added premium for user', user);
          users[userIdx] = user;
        }, function errorCallback(response) {
          console.error('could not make user premium', response);
        });
    };

    $scope.deletePremium = function(users, user) {
      var userIdx = users.indexOf(user);
      usersFactory
        .deletePremium(user)
        .then(function successCallback(user) {
          console.log('deleted premium for user', user);
          users[userIdx] = user;
        }, function errorCallback(response) {
          console.error('could not delete premium', response);
        });
    };
  }]);
