'use strict';

angular.module('alumni-db-frontend').directive('validationMessages', function() {

    function linkFn (scope, el, attrs, formCtrl) {
        el.hide();
        var _show = false;

        scope.$on('show-errors-messages-block', function () {
          _show = true; 
          return true;
        });

        scope.$watch(function () {
          return _show && formCtrl.$invalid;
        }, function (invalid) {
          if (invalid) {
            return el.show();
          }
          _show = false;
          return el.hide();
        });        

    }

    return {
      restrict: 'E',
      require: '^form',
      scope: {
        getMessages: '=getMessages',
        getTitle: '=getTitle',
        form: '=form'
      },
      templateUrl: '/views/directives/validationMessages.html',
      link: linkFn
    };
  });