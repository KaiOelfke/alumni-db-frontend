import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editProfileComponent from './edit-profile.component';

let editProfileModule = angular.module('edit-profile', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('edit-profile', {
      url: '/profile/edit',
      component: 'editProfile',
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
        user: ($auth) => {
          return $auth.validateUser();
        }
      }
    });
})

.component('editProfile', editProfileComponent)

.name;

export default editProfileModule;
