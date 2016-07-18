import angular from 'angular';
import uiRouter from 'angular-ui-router';
import eventsComponent from './events.component';

let eventsModule = angular.module('events', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('events', {
      url: '/events',
      template: '<events></events>'
    });
})

.component('events', eventsComponent)
  
.name;

export default eventsModule;
