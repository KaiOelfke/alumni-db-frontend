'use strict';

/**
 * @ngdoc function
 * @name alumniWebApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the alumniWebApp
 */
angular.module('alumniWebApp')
  .controller('UsersCtrl', ['usersFactory','$scope',function UsersCtrl (usersFactory,$scope) {
    $scope.users =[];

    usersFactory.getUsers()
        .success(function  (data) {
            $scope.users = data;
        })
        .error(function (error) {
            console.error(error);
        });

  }]);
