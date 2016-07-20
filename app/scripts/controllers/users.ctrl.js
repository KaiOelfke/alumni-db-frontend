'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .controller('UsersCtrl', ['FileSaver', 'Blob', 'API_HOST', '$http', 'usersFactory', 'subscriptionsFactory', '$scope', function UsersCtrl(FileSaver, Blob, API_HOST, $http, usersFactory, subscriptionsFactory, $scope) {

    $scope.makePremium = function(users, user) {
      var userIdx = users.indexOf(user);
      usersFactory
        .makePremium(user)
        .then(function successCallback(user) {
          // console.log('added premium for user', user);
          users[userIdx] = user;
        }, function errorCallback(response) {
          console.error('could not make user premium', response);
        });
    };

    $scope.deletePremium = function(users, user) {
      var userIdx = users.indexOf(user);
      usersFactory
        .deletePremium(user)
        .then(function successCallback(user) {
          // console.log('deleted premium for user', user);
          users[userIdx] = user;
        }, function errorCallback(response) {
          console.error('could not delete premium', response);
        });
    };

    $scope.downloadCSV = function () {
      $http({method: 'GET', url: API_HOST + '/users.csv'}).
        success(function(data, status, headers, config) {
          // var anchor = angular.element('<a/>');
          // anchor.css({display: 'none'}); 
          // anchor.attr({
          //   href: 'data:text/csv;charset=utf-8,' + encodeURI(data),
          //   target: '_blank',
          //   download: 'filename.csv'
          // });
          // angular.element(document.body).append(anchor);
          // anchor[0].click();
          // anchor.remove();

          var blob = new Blob([data], { type:"test/csv;charset=utf-8;"});     
          FileSaver.saveAs(blob, 'users.csv');
          // var downloadLink = angular.element('<a></a>');
          // downloadLink.css({display: 'none'});
          // var windowURL = window.URL || window.webkitURL;
          // downloadLink.attr('href',windowURL.createObjectURL(blob));
          // downloadLink.attr('download', 'users.csv');
          // downloadLink[0].click();
          // downloadLink.remove();
        }).
        error(function(data, status, headers, config) {
          // handle error
          console.log('a');
      });
    }

  }]);
