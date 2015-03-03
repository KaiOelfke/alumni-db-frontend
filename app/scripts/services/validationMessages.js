'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:validationMessagesFactory
 * @description
 * # validationMessagesFactory
 * Controller of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('validationMessagesFactory', [function () {
        var validationMessagesFactory = {};

        /*jshint camelcase: false */
        var _messages = {
          confirm_password: 'confirm password:',
          password: 'password:',
          email: 'email:',
          birthday: 'Date of Birth:',
          firstname: 'First name: ',
          lastname: 'Last name: ',
          country: 'Country: ',
          student_company_name: 'Student company name: ',
          city: 'City: ',
          institution: 'Institution: ',
          'confirm_password.required': 'confirm_password is not valid',
          'password.required': 'password is not valid',
          'password.minlength': 'password is minlength 8',
          'confirm_password.minlength': 'confirm_password is minlength 8',                    
          'email.required': 'email is required',
          'email.email': 'email is not valid',
          'birthday.dateFormat': 'date format is not valid example 01.11.1993',
          'lastname.required': 'lastname is required',
          'firstname.required': 'firstname is required',
          'city.required': 'city is required',
          'student_company_name.required': 'is required',
          'institution.required': 'is required'
        };

        var _title = 'Change a few things up and try submitting again.';

        validationMessagesFactory.getValidationMsg = function (id) {
          return _messages[id] || '';
        };

        validationMessagesFactory.getValidationTitle = function () {
          return _title || '';
        };

        return validationMessagesFactory;
  }]);
