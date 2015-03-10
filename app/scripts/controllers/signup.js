(function(){
'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');

app.controller('SignupCtrl', [
  'validationMessagesFactory',
  '$auth',
  '$state',
  'toaster',
  '$scope',
  function(validationMessagesFactory, $auth, $state, toaster, $scope) {
    $scope.signupData = {};
    $scope.formValidationMessages = validationMessagesFactory.getValidationMsg;
    $scope.farmValidationTitle = validationMessagesFactory.getValidationTitle;

    $scope.handleSignUpBtnClick = function(signupData) {
      $scope.$broadcast('show-errors-messages-block');

      if ($scope.signupForm.$invalid) {
        return ;
      }
      $auth.submitRegistration(signupData)
        .then(function() {
        })
        .catch(function() {
          toaster.pop('error', 'Something went wrong.');
        });
    };
  }
]);

app.directive('compareTo', ['$parse', function($parse) {
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

})();
