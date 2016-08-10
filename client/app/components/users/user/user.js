import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userComponent from './user.component';

let userModule = angular.module('user', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('userPanel.user', {
      url: '/user/:userId',
      component: 'userPanel.user',
      onEnter: (AclService, $state, $transition$, $auth) => {
        const user = $transition$.getResolveValue('user');

        if (user == null) {
          return $state.target('notfound');
        }

        return $auth
            .validateUser()
            .then((user) => {
                AclService.detachRole('guest');
                
                if (user.statuses.indexOf("completedProfile") > -1) {
                  AclService.attachRole('registeredUser');
                } else {
                  AclService.attachRole('notRegisteredUser');
                }

                if (AclService.can('showUser')) {
                    return true;
                }

                return $state.target('unauthorized');

            }, () => $state.target('unauthorized'));
      },
      resolve: {
        currentUser: ($auth, $q) => {
          return $auth.validateUser().catch(() => $q.reject('unauthorized'));
        },
        user: (Users, $stateParams, $q) => {
          return Users.getUser($stateParams.userId)
                      .then((resp) => resp.data.data,
                            () => $q.reject('notfound'));
        }
      }

    });
})

.component('userPanel.user', userComponent)

.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError({to: 'userPanel.user'}, ($transition$, $error$) => {

    $transition$.promise.catch((error) => {
      if (error === 'unauthorized') {
        $state.go('unauthorized');
      } else {
        $state.go('notfound');
      }
    });

  });
})

.name;

export default userModule;
