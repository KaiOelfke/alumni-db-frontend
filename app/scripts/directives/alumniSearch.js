'use strict';

angular
  .module('alumni-db-frontend')
  .directive('alumniSearch', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/alumniSearch/template.html'
    };
  });
