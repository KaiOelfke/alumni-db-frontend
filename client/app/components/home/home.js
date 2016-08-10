import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import Common from '../../common/common';

let homeModule = angular.module('home', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('userPanel.home', {
      url: '',
      component: 'userPanelHome',
      onEnter: (AclService, $auth, $state) => {

        return $auth
            .validateUser()
            .then((user) => {
                AclService.detachRole('guest');
                
                if (user.statuses.indexOf("completedProfile") > -1) {
                  AclService.attachRole('registeredUser');
                } else {
                  AclService.attachRole('notRegisteredUser');
                }

                if (AclService.can('home')) {
                    return true;
                }

                return $state.target('unauthorized');

            }, () => $state.target('unauthorized'));
      }

    });
})

.component('userPanelHome', homeComponent)

.name;

export default homeModule;
