import angular from 'angular';
import uiRouter from 'angular-ui-router';
import premiumComponent from './premium.component';

let premiumModule = angular.module('premium', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('premium', {
      url: '/premium',
      template: '<premium></premium>'
    });
})

.component('premium', premiumComponent)
  
.name;

export default premiumModule;
