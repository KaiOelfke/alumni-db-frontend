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

        var uploadImage = function uploadImage (files, path) {
          var deferred = $q.defer();
          if (files && files.length > 0) {
            var file = files[0];
            $upload.upload({
                method: 'put',
                url: path,
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

        var getImage = function getImage (image) {

          if (! (image && image.url) ) {
            return '';
          }
          if (/amazonaws.com/.test(image.url)) {
            return image.url;
          }
          if (ENV  === 'development') {
            return 'http://localhost:3000/' + image.url;
          }
          return image.url;
        };

        avatarFactory.uploadPicture = function uploadPicture (files, groupid) {
          return uploadImage(files, API_HOST + '/groups/' + groupid);
        };

        avatarFactory.uploadAvatar = function uploadAvatar (files) {
          return uploadImage(files, API_HOST + '/auth');
        };

        avatarFactory.getGroupPicture = function getGroupPicture (group) {
          return getImage(group.picture);
        };

        avatarFactory.getUserAvatar = function getUserAvatar (user) {
          return getImage(user.avatar);
        };

        return avatarFactory;
  }]);
