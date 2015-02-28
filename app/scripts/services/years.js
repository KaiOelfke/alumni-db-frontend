'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:yearsFactory
 * @description
 * # yearsFactory
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('yearsFactory', [function () {
        var yearsFactory = {};

        function getYears() {
          var input = [];
          var min = 1900;
          var max = moment().year();
          for (var i=min; i<=max; i++){
            input.push(i);
          }
          return input;
        }

        yearsFactory.getYears = getYears;

        return yearsFactory;
  }]);


