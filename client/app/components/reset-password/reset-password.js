import angular from 'angular';
import uiRouter from 'angular-ui-router';
import resetPasswordComponent from './reset-password.component';

let resetPasswordModule = angular.module('resetPassword', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";


  $stateProvider
    .state('reset-password', {
      url: '/reset-password',
      component: 'resetPassword',
      onEnter: ($auth, AclService, $state) => {
        AclService.flushRoles();
        
        return $auth
            .validateUser()
            .then((user) => {
                if (user.statuses.indexOf("completedProfile") > -1) {
                  AclService.attachRole('registeredUser');
                } else {
                  AclService.attachRole('notRegisteredUser');
                }

                if (AclService.can('reset-password')) {
                  return true;
                }

                return $state.target('unauthorized');
            }, () => {
              AclService.attachRole('guest');
              if (AclService.can('reset-password')) {
                return true;
              }
              return $state.target('unauthorized');
            });
      }
    });
})


.component('resetPassword', resetPasswordComponent)

.name;

export default resetPasswordModule;
