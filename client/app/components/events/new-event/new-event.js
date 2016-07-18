import angular from 'angular';
import uiRouter from 'angular-ui-router';
import newEventComponent from './new-event.component';

let newEventModule = angular.module('new-event', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('new-event', {
      url: '/event/new',
      template: '<new-event></new-event>'
    });
})

.component('new-event', newEventComponent)
  
.name;

export default newEventModule;
