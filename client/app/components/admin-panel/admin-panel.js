import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminPanelComponent from './admin-panel.component';

let adminPanelModule = angular.module('adminPanel', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('adminPanel', {
      url: '/admin',
      abstract: true,
      component: 'adminPanel',
      onEnter: (AclService, $auth, $state) => {
        return $auth
            .validateUser()
            .then((user) => {
                if (user.is_super_user) {
                    return true;
                }

                return $state.target('unauthorized');
            }, () => $state.target('unauthorized'));
      }

    });
})

.component('adminPanel', adminPanelComponent)

.name;

export default adminPanelModule;
