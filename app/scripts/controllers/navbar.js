'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');

app.controller('NavbarCtrl', [
  '$auth', 
  '$scope',
  function($auth, $scope) {
    console.log('Hello, world!');
    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) { 
          // handle success response
          console.log('Everything went great!');
          console.log(resp);
        })
        .catch(function(resp) { 
          // handle error response
          console.log('Something went wrong!');
          console.log(resp);
        });
    };
  }
]);
