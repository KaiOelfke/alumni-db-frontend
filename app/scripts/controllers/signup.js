'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumni-db-frontend
 */

function signupCtrl(usersFactory, $scope) {

    $scope.insertUser = function (user) {


        usersFactory.insertUser(user)
            .success(function  () {
                console.log('success');
            })
            .error(function (error) {
                console.error(error);
            });

    };
}

angular.module('alumni-db-frontend')
  .controller('SignupCtrl', ['usersFactory', '$scope', signupCtrl]);



