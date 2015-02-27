'use strict';

angular.module('alumni-db-frontend').directive('dateFormat', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$parsers.unshift(function(viewValue) {
        if (moment(viewValue, 'DD.MM.YYYY', true).isValid()) {
          // it is valid
          ctrl.$setValidity('dateFormat', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('dateFormat', false);
          return undefined;
        }
      });
    }
  };
});
