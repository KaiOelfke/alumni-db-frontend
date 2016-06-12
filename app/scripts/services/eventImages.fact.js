'use strict';

/**
 * @ngdoc factory
 * @name eventImagesFactory
 *
 * @description
 * TODO
 */
angular
  .module('alumni-db-frontend')
  .factory('eventImagesFactory', ['ENV', 'Upload', 'API_HOST', '$q', function(ENV, Upload, API_HOST, $q) {

    var eventImagesFactory = {};

    eventImagesFactory.uploadLogo = function(file) {
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

    eventImagesFactory.uploadHeader = function(file) {
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

    eventImagesFactory.getEventLogo = function(event) {
      if (!event || !(event.logo_photo && event.logo_photo.url)) {
        return '';
      }

      if (/amazonaws.com/.test(event.logo_photo.url)) {
        return event.logo_photo.url;
      }

      if (ENV === 'development') {
        return 'http://localhost:3000/' + event.logo_photo.url;
      }
    };

    eventImagesFactory.getEventHeader = function(event) {
      if (!event || !(event.cover_photo && event.cover_photo.url)) {
        return '';
      }

      if (/amazonaws.com/.test(event.cover_photo.url)) {
        return event.cover_photo.url;
      }

      if (ENV === 'development') {
        return 'http://localhost:3000/' + event.cover_photo.url;
      }
    };

    return eventImagesFactory;

  }]);
