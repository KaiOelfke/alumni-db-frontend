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
  '$state', 
  function($auth, $scope, $state) {
    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function() { 
          // handle success response
          $state.go('home.guest.signin');
        })
        .catch(function(resp) { 
          // handle error response
          console.log(resp);
          $scope.alert('Sorry, something went wrong.');
        });
    };
  }
]);
