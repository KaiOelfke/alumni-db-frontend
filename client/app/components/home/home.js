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
    .state('home', {
      url: '/',
      component: 'home',
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

.component('home', homeComponent)

.name;

export default homeModule;
