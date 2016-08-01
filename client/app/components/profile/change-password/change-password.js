import angular from 'angular';
import uiRouter from 'angular-ui-router';
import changePasswordComponent from './change-password.component';

let changePasswordModule = angular.module('change-password', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('change-password', {
      url: '/profile/change-password',
      component: 'changePassword',
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

                if (AclService.can('change-password')) {
                  return true;
                }

                return $state.target('unauthorized');

            }, () => $state.target('unauthorized'));
      },
      resolve: {
        user: ($auth, $q) => {
          return $auth.validateUser().catch(() => $q.reject('unauthorized'));;
        }
      }
    });
})

.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError({to: 'change-password'}, ($transition$, $error$) => {

    $transition$.promise.catch((error) => {
      if (error === 'unauthorized') {
        $state.go('unauthorized');
      }
    });

  });
})


.component('changePassword', changePasswordComponent)

.name;

export default changePasswordModule;
