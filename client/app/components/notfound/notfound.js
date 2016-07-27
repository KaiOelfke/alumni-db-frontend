import angular from 'angular';
import uiRouter from 'angular-ui-router';
import notfoundComponent from './notfound.component';

let notfoundModule = angular.module('notfound', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('notfound', {
      url: '/404',
      component: 'notfound',
    });
})

.component('notfound', notfoundComponent)
  
.name;

export default notfoundModule;
