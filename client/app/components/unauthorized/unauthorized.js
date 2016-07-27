import angular from 'angular';
import uiRouter from 'angular-ui-router';
import unauthorizedComponent from './unauthorized.component';

let unauthorizedModule = angular.module('unauthorized', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('unauthorized', {
      url: '/unauthorized',
      component: 'unauthorized',
    });
})

.component('unauthorized', unauthorizedComponent)
  
.name;

export default unauthorizedModule;
