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

.run(($transitions, $state, PageLoading) => {
  'ngInject';

  $transitions.onStart({to: 'userPanel.*'}, ($transition$, $error$) => {
    PageLoading.toggleLoading();
  });

  $transitions.onError({to: 'userPanel.*'}, ($transition$, $error$) => {
    PageLoading.toggleLoading();
  });

  $transitions.onSuccess({to: 'userPanel.*'}, ($transition$, $error$) => {
    PageLoading.toggleLoading();
  });
  
})

.name;

export default userPanelModule;
