'use strict';

/**
 * @ngdoc function
 * @name alumniDbFrontendApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumniDbFrontendApp
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

angular.module('alumniDbFrontendApp')
  .controller('SignupCtrl', ['usersFactory', '$scope', signupCtrl]);



