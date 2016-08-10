import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('admin.home', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('adminPanel.home', {
      url: '',
      component: 'adminPanel.home',
    });
})

.component('adminPanel.home', homeComponent)
  
.name;

export default homeModule;
