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
          country_of_participation: 'Country of participation: ',
          year_of_participation: 'Year of participation: ',
          member_since: 'Member since: ',
          short_bio: 'Short bio: ',
          facebook_url: 'Facebook URL: ',
          twitter_url: 'Twitter URL: ',
          linkedin_url: 'LinkedIn URL: ',
          /*'confirm_password.required': 'Password confirmation is required.',*/
          'password.required': 'Some security is needed so no one can change your account.',
          'password.minlength': 'The minimum length is 8.',
          'confirm_password.minlength': 'The minimum length is 8.',
          'confirm_password.match': 'Passwords have to match.',
          'password_confirmation': 'Passwords have to match.',
          'email.required': 'We will not spam you, but we need your email.',
          'email.email': 'The format seems to be wrong.',
          'birthday.dateFormat': 'Maybe the date format is wrong. It should be like in this example: 01.11.1993 / day.month.year',
          'lastname.required': 'We need your last name',
          'firstname.required': 'We need your first name',
          'city.required': 'Please enter the city you currently live in',
          'student_company_name.required': 'Every real company needs a name!',
          'institution.required': 'The name of the institution where you did the JA program is missing.',
          'country.required': 'Please enter the country in that you currently live.',
          'country_of_participation.required': 'Please enter in which country you participated in the JA program.',
          'year_of_participation.required': 'Please enter in which year you participated in the JA program.',
          'member_since.dateFormat': 'Maybe the date format is wrong. It should be like in this example: 06.06.2006 / day.month.year',
          'short_bio.maxlength': 'The maximum length is 160 letters.',
          'facebook_url.url': 'The URL is not valid.',
          'linkedin_url.url': 'The URL is not valid.',
          'twitter_url.url': 'The URL is not valid.'
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
