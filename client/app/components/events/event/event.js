import angular from 'angular';
import uiRouter from 'angular-ui-router';
import eventComponent from './event.component';

let eventModule = angular.module('event', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('event', {
      url: '/events/:eventId',
      template: '<event></event>'
    });
})

.component('event', eventComponent)
  
.name;

export default eventModule;
