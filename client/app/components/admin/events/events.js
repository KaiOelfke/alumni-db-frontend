import angular from 'angular';
import uiRouter from 'angular-ui-router';
import eventsComponent from './events.component';
import showEventComponent from './show-event/show-event.component';
import editEventComponent from './edit-event/edit-event.component';
import createEventComponent from './create-event/create-event.component';
import addCodeComponent from './add-code/add-code.component';
import addFeeComponent from './add-fee/add-fee.component';
import editFeeComponent from './edit-fee/edit-fee.component';


let eventsModule = angular.module('adminPanelEvents', [
  uiRouter
])

.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('adminPanel.Events', {
      url: '/events',
      component: 'adminPanelEvents',
    })
    .state('adminPanel.EventsCreateEvent', {
      url: '/events/create',
      component: 'adminPanelEventsCreateEvent',
    })    
    .state('adminPanel.EventsShowEvent', {
      url: '/events/:id',
      component: 'adminPanelEventsShowEvent',
      resolve: {
        event: (Events, $stateParams, $q) => {
          return Events.Resource.get({id: $stateParams.id}).$promise
                      .then((resp) => {
                              const data = resp.data;
                              if (data.event) {
                                return data.event;
                              }
                              return data;
                            },
                            () => $q.reject('notfound'));
        }
      }
    })
    .state('adminPanel.EventsEditEvent', {
      url: '/events/:id/edit',
      component: 'adminPanelEventsEditEvent',
      resolve: {
        event: (Events, $stateParams, $q) => {
          return Events.Resource.get({id: $stateParams.id}).$promise
                      .then((resp) => {
                              const data = resp.data;
                              if (data.event) {
                                return data.event
                              }    
                              return data;
                            },
                            () => $q.reject('notfound'));
        }
      }
    });  
})

.component('adminPanelAddCode', addCodeComponent)

.component('adminPanelAddFee', addFeeComponent)

.component('adminPanelEditFee', editFeeComponent)

.component('adminPanelEvents', eventsComponent)

.component('adminPanelEventsShowEvent', showEventComponent)

.component('adminPanelEventsEditEvent', editEventComponent)

.component('adminPanelEventsCreateEvent', createEventComponent)

.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError(
    {to: 'adminPanel.Events*'},
    ($transition$, $error$) => {
      $transition$.promise.catch((error) => {
          $state.go('notfound');
      });
  });
})

.name;

export default eventsModule;
