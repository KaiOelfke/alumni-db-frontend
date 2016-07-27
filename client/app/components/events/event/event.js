import angular from 'angular';
import uiRouter from 'angular-ui-router';
import eventComponent from './event.component';

let eventModule = angular.module('event', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('event', {
      url: '/events/:eventId',
      component: 'event',
      onEnter: (AclService, $state) => {
        if (AclService.can('event')) {
            return true;
        }
        return $state.target('unauthorized');
      }
    });
})

.component('event', eventComponent)

.name;

export default eventModule;
