'use strict';

/**
 * @ngdoc factory
 * @name avatarFactory
 * @requires ENV
 * @requires Upload
 * @requires API_HOST
 * @requires $q
 *
 * @description
 * TODO
 */
angular.module('alumni-db-frontend')
  .factory('avatarFactory', ['ENV', 'Upload', 'API_HOST', '$q', function(ENV, Upload, API_HOST, $q) {

    var avatarFactory = {};

    avatarFactory.uploadAvatar = function uploadAvatar(file) {
      var deferred = $q.defer();
      Upload.upload({
        method: 'put',
        url: API_HOST + '/auth',
        data: {
          avatar: file
        }
      }).progress(function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config);
        deferred.notify(progressPercentage);
      }).success(function(data, status, headers, config) {
        deferred.resolve(data);
        console.log('file ' + config + 'uploaded. Response: ' + data);
      }).error(function(err) {
        console.log('error', err);
        deferred.reject(err);
      });

      return deferred.promise;
    };

    avatarFactory.getUserAvatar = function getUserAvatar(user) {
      if (!(user.avatar && user.avatar.url)) {
        return '';
      }

      if (/amazonaws.com/.test(user.avatar.url)) {
        return user.avatar.url;
      }

      if (ENV === 'development') {
        return 'http://localhost:3000/' + user.avatar.url;
      }
    };

    return avatarFactory;
  }]);
