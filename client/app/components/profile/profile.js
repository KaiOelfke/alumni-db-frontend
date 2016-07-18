import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileComponent from './profile.component';

let profileModule = angular.module('profile', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('profile', {
      url: '/profile',
      template: '<profile></profile>'
    });
})

.component('profile', profileComponent)
  
.name;

export default profileModule;
