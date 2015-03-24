'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');

app.controller('GroupsCtrl', [
  '$auth',
  '$rootScope',
  '$state',
  function($auth, $rootScope, $state) {
    console.log($auth, $rootScope, $state);
    window.alert('Hi!');
  }
]);
