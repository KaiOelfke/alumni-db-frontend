import angular from 'angular';
import uiRouter from 'angular-ui-router';
import eventsComponent from './events.component';

let eventsModule = angular.module('events', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('events', {
      url: '/events',
      component: 'events',
      onEnter: (AclService, $auth, $state) => {
        return $auth
            .validateUser()
            .then((user) => {
                AclService.detachRole('guest');
                
                if (user.statuses.indexOf("completedProfile") > -1) {
                  AclService.attachRole('registeredUser');
                } else {
                  AclService.attachRole('notRegisteredUser');
                }

                if (AclService.can('events')) {
                    return true;
                }

                return $state.target('unauthorized');

            }, () => $state.target('unauthorized'));
      }
    });
})

.component('events', eventsComponent)

.name;

export default eventsModule;
