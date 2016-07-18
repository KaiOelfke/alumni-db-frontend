import angular from 'angular';
import uiRouter from 'angular-ui-router';
import registrationComponent from './registration.component';

let registrationModule = angular.module('registration', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('registration', {
      url: '/registration',
      template: '<registration></registration>'
    });
})

.component('registration', registrationComponent)
  
.name;

export default registrationModule;
