'use strict';

/**
  * @ngdoc directive
  * @name alumniSearch
  *
  * @description
  * A directive which returns a template for a search bar and a search button.
  * An additional option should be implemented to set if the results should be
  * rendered within that template or if they should appear on a different view.
  */
angular
  .module('alumni-db-frontend')
  .directive('alumniSearch', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/alumniSearch/template.html'
    };
  });
