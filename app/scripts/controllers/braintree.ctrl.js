(function() {
  'use strict';

  var app = angular.module('alumni-db-frontend');

  /**
    * @ngdoc controller
    * @name braintreeCtrl
    * @requires $scope
    *
    * @description
    * TODO
    */
  app.controller('braintreeCtrl', ['$scope', function($scope) {

    /**
      * @ngdoc function
      * @name braintreeCtrl#someFunction
      * @methodOf braintreeCtrl
      *
      * @description
      * TODO
      *
      * @param {Object} param1
      * TODO
      *
      * @returns {Object}
      * TODO
      */
    $scope.someFunction = function(param1) {
      console.log('someFunction called', param1);
      return null;
    };

  }]);

})();
