'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:genderFactory
 * @description
 * # genderFactory
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('genderFactory', [function() {
    var genderFactory = {};

    var _types = ['Male', 'Female'];

    genderFactory.getGenderName = function(code) {
      if (code < _types.length && code >= 0) {
        return _types[code];
      }

      return '';
    };

    return genderFactory;
  }]);
