import angular from 'angular';
import uiRouter from 'angular-ui-router';
import premiumComponent from './premium.component';

let premiumModule = angular.module('premium', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('premium', {
      url: '/premium',
      component: 'premium',
      onEnter: (AclService, $state) => {
        if (AclService.can('premium')) {
            return true;
        }
        return $state.target('unauthorized');
      }
    });
})

.component('premium', premiumComponent)

.name;

export default premiumModule;
