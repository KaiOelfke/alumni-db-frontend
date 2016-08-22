import angular from 'angular';
import uiRouter from 'angular-ui-router';
import eventComponent from './event.component';

let eventModule = angular.module('event', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('userPanel.Event', {
      url: '/events/:eventId',
      component: 'userPanelEvent',
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

                if (AclService.can('event')) {
                    return true;
                }

                return $state.target('unauthorized');

            }, () => $state.target('unauthorized'));
      },
      resolve: {
        eventFees: (Events, $stateParams, $q) => {
          return Events.Resource.get({id: $stateParams.eventId})
                      .$promise
                      .then( (resp) => resp.data,
                             () => $q.reject('notfound'))
        },
        currentUser: ($auth) => {
          return $auth
            .validateUser()
            .catch(() => $q.reject('unauthorized'))
        },
        application: (Applications, currentUser, $stateParams, $q) => {
          return Applications
            .getByUser(currentUser.id, $stateParams.eventId)
            .catch(() => $q.resolve(null))
        },
        participation: (Participations, currentUser, $stateParams, $q) => {
          return Participations
            .getByUser(currentUser.id, $stateParams.eventId)
            .catch(() => $q.resolve(null))
        }        
      }
    });
})

.component('userPanelEvent', eventComponent)

.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError({to: 'userPanel.Event'}, ($transition$, $error$) => {

    $transition$.promise.catch((error) => {
      if (error === 'unauthorized') {
        $state.go('unauthorized');
      } else {
        $state.go('notfound');
      }
    });

  });
})

.name;

export default eventModule;
