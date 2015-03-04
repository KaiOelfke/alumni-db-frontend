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
          confirm_password: 'Password confirmation:',
          password: 'Password:',
          email: 'Email:',
          birthday: 'Birthday:',
          firstname: 'First name: ',
          lastname: 'Last name: ',
          country: 'Country: ',
          student_company_name: 'Student company name: ',
          city: 'City: ',
          institution: 'Institution: ',
          'confirm_password.required': 'Sorry. You need to have a confirmation. To avoid the typos.',
          'password.required': 'Some security is needed so no one can change your account.',
          'password.minlength': 'The minimum length is 8.',
          'confirm_password.minlength': 'The minimum length is 8.',
          'email.required': 'We will not spam you, but we need your email.',
          'email.email': 'The format seems to be wrong.',
          'birthday.dateFormat': 'Maybe the date format is wrong. It should be like in this example: 01.11.1993 / day.month.year',
          'lastname.required': 'You have a last name, right?',
          'firstname.required': 'You have a first name, right?',
          'city.required': 'Please enter your city, village, settlement or some location.',
          'student_company_name.required': 'Every real company needs a name!',
          'institution.required': 'The name of the institution where you did the JA program is missing.'
        };

        var _title = 'Change a few things and try submitting again.';

        validationMessagesFactory.getValidationMsg = function (id) {
          return _messages[id] || '';
        };

        validationMessagesFactory.getValidationTitle = function () {
          return _title || '';
        };

        return validationMessagesFactory;
  }]);
