import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userPanelComponent from './user-panel.component';

let userPanelModule = angular.module('userPanel', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";


  $stateProvider
    .state('userPanel', {
      url: '/home',
      abstract: true,
      component: 'userPanel'
    });
})

.component('userPanel', userPanelComponent)

.name;

export default userPanelModule;
