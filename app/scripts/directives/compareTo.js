'use strict';

angular.module('alumni-db-frontend').directive('compareTo', ['$parse', function($parse) {
  return {
    require: 'ngModel',
    scope: {
      otherValue: '=compareTo'
    }, 
    link: function(scope, elm, attrs, ctrl) {
      var modelSetter = $parse(attrs.ngModel).assign;
      function parser(viewValue){
        if(viewValue === getMatchValue()){
          ctrl.$setValidity('compareTo', true);
          return viewValue;
        }else{
          ctrl.$setValidity('compareTo', false);
          return undefined;
        }
      }
      function formatter(modelValue){
        return modelValue === undefined? ctrl.$isEmpty(ctrl.$viewValue)? undefined : ctrl.$viewValue : modelValue;
      }
      function getMatchValue(){
        return scope.otherValue;
      }
      scope.$watch(getMatchValue, function(){
        modelSetter(scope, parser(ctrl.$viewValue));
      });
      ctrl.$parsers.unshift(parser);
      ctrl.$formatters.unshift(formatter);
    }
  };
}]);