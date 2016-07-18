import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signupComponent from './signup.component';

let signupModule = angular.module('signup', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('signup', {
      url: '/signup',
      template: '<signup></signup>'
    });
})

.component('signup', signupComponent)
  
.name;

export default signupModule;
