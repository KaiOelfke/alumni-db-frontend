'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:programTypesFactory
 * @description
 * # programTypesFactory
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('programTypesFactory', [function () {
        var programTypesFactory = {};

        var _types = [ 'Company' , 'Startup' , 'Other'];

        programTypesFactory.getTypeName = function (code) {
          if (code < _types.length && code >= 0) {
            return _types[code];
          }
          return '';
        };

        return programTypesFactory;
  }]);
