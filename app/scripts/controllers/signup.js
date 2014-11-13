'use strict';

/**
 * @ngdoc function
 * @name alumniWebApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumniWebApp
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

angular.module('alumniWebApp')
  .controller('SignupCtrl', ['usersFactory', '$scope', signupCtrl]);



