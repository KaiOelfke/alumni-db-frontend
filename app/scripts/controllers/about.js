'use strict';

/**
 * @ngdoc function
 * @name alumniWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the alumniWebApp
 */
angular.module('alumniWebApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
