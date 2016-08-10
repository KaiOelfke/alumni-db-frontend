import angular from 'angular';
import uiRouter from 'angular-ui-router';
import eventComponent from './event.component';

let eventModule = angular.module('event', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('userPanelEvent', {
      url: '/events/:eventId',
      component: 'userPanel.event',
      onEnter: (AclService, $state) => {
        if (AclService.can('event')) {
            return true;
        }
        return $state.target('unauthorized');
      }
    });
})

.component('userPanelEvent', eventComponent)

.name;

export default eventModule;
