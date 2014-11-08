'use strict';

/**
 * @ngdoc function
 * @name alumniDbFrontendApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the alumniDbFrontendApp
 */
angular.module('alumniDbFrontendApp')
  .controller('UsersCtrl', ['usersFactory','$scope',function (usersFactory,$scope) {
    $scope.users =[];

    usersFactory.getUsers()
        .success(function  (data) {
            $scope.users = data;
        })
        .error(function (error) {
            console.error(error);
        });

  }]);
