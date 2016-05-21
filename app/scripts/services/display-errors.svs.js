'use strict';

angular
  .module('alumni-db-frontend')
  .service('displayErrors', function() {

    var displayErrors = {};

    displayErrors.convertErrorResponse = function(response) {
      if (response.data.status !== 'error' || !response.data.errors) {
        return 'Something went wrong!';
      }

      var strToReturn = 'There was an error with the following fields:\n';
      var errorObject = response.data.errors;
      for (var errorKey in errorObject) {
        var errors = errorObject[errorKey];
        if (Array.isArray(errors) && errors.length > 0) {
          strToReturn += '  \'' + errorKey + '\':\n';
        }

        for (var i = 0; i < errors.length; i++) {
          var currentError = errors[i];
          strToReturn += '   - ' + currentError + '\n';
        }
      }

      return strToReturn;
    };

    return displayErrors;

  });
