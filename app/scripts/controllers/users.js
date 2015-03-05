'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .controller('UsersCtrl', ['usersFactory', '$scope', function UsersCtrl (usersFactory,$scope) {
    $scope.users =[];

    usersFactory.getUsers()
        .success(function  (data) {

            var u = data[0];
            console.log(u);
            console.log(u.statuses);

            $scope.users = data;
        })
        .error(function (error) {
            console.error(error);
        });
  }]);
