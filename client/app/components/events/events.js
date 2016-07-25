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
      template: '<events></events>',
      resolve: {
        'acl' : ['$q', 'AclService', ($q, AclService) => {
          if(AclService.can('events')){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      },
      
    });
})

.component('events', eventsComponent)
  
.name;

export default eventsModule;
