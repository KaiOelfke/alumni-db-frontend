'use strict';

/**
 * @ngdoc function
 * @name alumniWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alumniWebApp
 */
angular.module('alumniWebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
