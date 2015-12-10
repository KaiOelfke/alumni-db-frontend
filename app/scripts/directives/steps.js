'use strict';

angular.module('alumni-db-frontend')
  .directive('steps', function() {
    return {
      restrict: 'EA',
      controller: ['$scope', function stepsController() {
        this.steps = {};
      }],

      link: function(scope, element, attrs, stepsController) {
        var watchExpr = attrs.on;
        var onClass = attrs.steps;
        var currentStep;

        scope.$watch(watchExpr, function stepWatchAction(value) {

          if (currentStep) {
            currentStep.element.removeClass(onClass);
          }

          currentStep = stepsController.steps['' + value];
          currentStep.element.addClass(onClass);
        });

      }
    };

  });

angular.module('alumni-db-frontend')
  .directive('step', function() {
    return {
      require: '^steps',
      link: function(scope, element, attr, ctrl) {
        ctrl.steps['' + attr.step] = {
          element: element
        };
      }
    };
  });
