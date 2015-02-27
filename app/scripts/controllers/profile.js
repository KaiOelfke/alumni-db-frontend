'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the alumni-db-frontend
 */

var app = angular.module('alumni-db-frontend');


app.controller('ProfileCtrl', [
  'usersFactory',
  '$auth',
  '$state',
  'authorizationService',
  'USER_ROLES',
  '$scope',
  function(usersFactory, $auth, $state, authorizationService, USER_ROLES, $scope) {

    console.log($state.params.id);

    if ($state.current.name === 'home.loggedin.profile-show') {
      usersFactory.getUser($state.params.id)
      .success(function (data) {
        $scope.userData = data;
      })
      .error(function (error) {
        console.error(error);
      });
    }

    $scope.goToUpdateUser = function() {
      $state.go('profile-update');
    };

    $scope.submitUpdatedUserData = function(userData) {
      $auth.updateAccount(userData)
        .then(function(resp) {
            $state.go('home.loggedin.home');
            console.log('data updated ', resp);
        })
        .catch(function(resp) {
            console.log( resp);
        });
    };
  }
]);
