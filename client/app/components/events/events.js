import angular from 'angular';
import uiRouter from 'angular-ui-router';
import eventsComponent from './events.component';

let eventsModule = angular.module('events', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('userPanel.Events', {
      url: '/events',
      component: 'userPanelEvents',
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
      },
    resolve: {
      events: (Events, $q) => {
        return Events.Resource.get({})
                    .$promise
                    .then( (resp) => resp.data,
                           () => $q.reject('notfound'))
      }
    }
    });
})

.component('userPanelEvents', eventsComponent)

.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError({to: 'events.*'}, ($transition$, $error$) => {

    $transition$.promise.catch((error) => {
        $state.go('notfound');
    });

  });
})

.name;

export default eventsModule;
