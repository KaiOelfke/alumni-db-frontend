import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home',
      onEnter: (AclService, $state) => {
        if (AclService.can('home')) {
            return true;
        }
        return $state.target('unauthorized');
      }
    });
})

.component('home', homeComponent)

.name;

export default homeModule;
