'use strict';

angular
  .module('alumni-db-frontend')
  .factory('attachmentFactory', ['ENV', 'Upload', 'API_HOST', '$q', function(ENV, Upload, API_HOST, $q) {

    var attachmentFactory = {};

    attachmentFactory.uploadFile = function(file) {
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

    return attachmentFactory;

  }]);
