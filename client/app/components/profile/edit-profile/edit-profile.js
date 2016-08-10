import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editProfileComponent from './edit-profile.component';

let editProfileModule = angular.module('edit-profile', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('userPanel.edit-profile', {
      url: '/profile/edit',
      component: 'userPanelEditProfile',
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

                if (AclService.can('edit-profile')) {
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

.component('userPanelEditProfile', editProfileComponent)

.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError({to: 'userPanel.edit-profile'}, ($transition$, $error$) => {

    $transition$.promise.catch((error) => {
      if (error === 'unauthorized') {
        $state.go('unauthorized');
      }
    });

  });
})

.name;

export default editProfileModule;
