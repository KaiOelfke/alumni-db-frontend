import angular from 'angular';
import uiRouter from 'angular-ui-router';
import evntsComponent from './users.component';
import showEventComponent from './show-user/show-user.component';
import addCodeComponent from './add-code/add-code.component';
import addFeeComponent from './add-fee/add-fee.component';
import editFeeComponent from './edit-fee/edit-fee.component';

//import editEventComponent from './edit-user/edit-user.component';

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
    .state('adminPanel.EventsShowEvent', {
      url: '/users/:id',
      component: 'adminPanelEventsShowEvent',
      resolve: {
        event: (Events, $stateParams, $q) => {
          return Events.get({id: $stateParams.id}).$promise
                      .then((resp) => resp.data,
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

//.component('adminPanelEventsEditEvent', editEventComponent)

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
