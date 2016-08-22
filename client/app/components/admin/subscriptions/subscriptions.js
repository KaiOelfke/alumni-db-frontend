import angular from 'angular';
import uiRouter from 'angular-ui-router';
import subscriptionsComponent from './subscriptions.component';
import addPlanComponent from './add-plan/add-plan.component';
import editPlanComponent from './edit-plan/edit-plan.component';

let subscriptionsModule = angular.module('adminPanelSubscriptions', [
  uiRouter
])

.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('adminPanel.Subscriptions', {
      url: '/subscriptions',
      component: 'adminPanelSubscriptions',
    });
})

.component('adminPanelSubscriptionsAddPlan', addPlanComponent)

.component('adminPanelSubscriptionsEditPlan', editPlanComponent)

.component('adminPanelSubscriptions', subscriptionsComponent)
 
.name;

export default subscriptionsModule;
