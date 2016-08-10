import angular from 'angular';
import uiRouter from 'angular-ui-router';
import confirmationComponent from './confirmation.component';

let confirmationModule = angular.module('confirmation', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('userPanel.confirmation', {
      url: '/profile/email-confirmation',
      component: 'confirmation',
    });
})

.component('confirmation', confirmationComponent)
  
.name;

export default confirmationModule;
