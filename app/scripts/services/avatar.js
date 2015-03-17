'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:avatarFactory
 * @description
 * # avatarFactory
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('avatarFactory', [ 'ENV',
                              '$upload',
                              'API_HOST',
                              '$q',function (ENV, $upload, API_HOST, $q) {
                                
        var avatarFactory = {};

        avatarFactory.uploadAvatar = function uploadAvatar (files) {
          var deferred = $q.defer();
          if (files && files.length > 0) {
            var file = files[0];
            $upload.upload({
                method: 'put',
                url: API_HOST + '/auth',
                file: file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config);
                deferred.notify(progressPercentage);
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
                console.log('file ' + config + 'uploaded. Response: ' + data);
            }).error(function  (err) {
                console.log('error', err);   
                deferred.reject(err);               
            });
          }
          return deferred.promise;

        };

        avatarFactory.getUserAvatar = function getUserAvatar (user) {
          if (! (user.avatar && user.avatar.url) ) {
            return '';
          }

          if (ENV  === 'development') {
            return 'http://localhost:3000/' + user.avatar.url;
          }
          return user.avatar.url;
        };

        return avatarFactory;
  }]);
