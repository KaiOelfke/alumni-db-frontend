import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signupComponent from './signup.component';

let signupModule = angular.module('signup', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('signup', {
      url: '/signup',
      component: 'signup',
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

                if (AclService.can('signup')) {
                  return true;
                }

                return $state.target('unauthorized');
            }, () => {
              AclService.attachRole('guest');
              if (AclService.can('signup')) {
                return true;
              }
              return $state.target('unauthorized');
            });
      }
    });
})

.component('signup', signupComponent)

.name;

export default signupModule;
