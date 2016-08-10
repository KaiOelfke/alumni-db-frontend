import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';
import profileComponent from './profile.component';

let profileModule = angular.module('profile', [
  uiRouter,
  ngFileUpload
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('userPanel.profile', {
      url: '/profile',
      component: 'userPanelProfile',
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

                if (AclService.can('profile')) {
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

.component('userPanelProfile', profileComponent)

.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError({to: 'userPanel.profile'}, ($transition$, $error$) => {

    $transition$.promise.catch((error) => {
      if (error === 'unauthorized') {
        $state.go('unauthorized');
      }
    });

  });
})

.name;

export default profileModule;
